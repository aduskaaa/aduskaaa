/* ==========================================================
   Far East Russia – Optimized Canvas Map Engine
   ----------------------------------------------------------
   • Optimized Performance with Spatial Indexing
   • Right-click Coordinate Retrieval
   • Simplified UI
   ========================================================== */

(function () {
    const canvas = document.getElementById('map-canvas');
    const ctx = canvas.getContext('2d', { alpha: false });
    const loader = document.getElementById('loading-screen');
    const ctxMenu = document.getElementById('ctx-menu');
    const coordsDisplay = document.getElementById('coords-display');

    // UI Sliders (Hidden but used for state)
    const sliders = {
        ox: document.getElementById('slider-ox'),
        oy: document.getElementById('slider-oy'),
        sx: document.getElementById('slider-sx'),
        sy: document.getElementById('slider-sy'),
        rot: document.getElementById('slider-rot')
    };

    // State
    const state = {
        viewX: 0,
        viewY: 0,
        zoom: 1.0,
        minZoom: 0.01,
        maxZoom: 2000,
        version: 'V2',
        layers: {
            mapAreas: [],
            prefabs: [],
            roads: [],
            ferries: [],
            cities: [],
            pois: [],
            streetview: []
        },
        toggles: {
            background: true,
            streetview: true
        },
        calibration: {
            ox: 0,
            oy: 0,
            sx: 45.0,
            sy: -110.0,
            rot: 0
        },
        background: { // Background covering Russia from ETS2 Global Background Map
            image: null,
            isLoaded: false,
            centerLon: 105.0, // Geographic center longitude of Russia (20°E to 190°E)
            centerLat: 61.0,  // Geographic center latitude of Russia (40°N to 82°N)
            widthInMapUnits: 170.0,   // 170 degrees longitude span (190°E - 20°E)
            heightInMapUnits: 42.0,  // 42 degrees latitude span (82°N - 40°N)
            isVisible: true
        }
    };

    function loadScript(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = () => {
                script.remove();
                resolve();
            };
            script.onerror = (err) => {
                script.remove();
                reject(err);
            };
            document.head.appendChild(script);
        });
    }

    async function loadDataset(version) {
        loader.style.display = 'flex';
        state.version = version;

        // Update HUD badge title
        const hudTitle = document.getElementById('map-hud-title');
        if (hudTitle) {
            hudTitle.textContent = version === 'V2' ? "WEB MAP VERSION 2" : "WEB MAP VERSION 1";
        }

        // Reset layer arrays
        state.layers.mapAreas = [];
        state.layers.prefabs = [];
        state.layers.roads = [];
        state.layers.ferries = [];
        state.layers.cities = [];
        state.layers.pois = [];
        state.layers.streetview = [];
        svPolylines = [];

        // Clear window globals to prevent bleed-through
        window.FER_DATA = null;
        window.streetview_data = null;

        try {
            // 1. Load geojson script tag dynamically
            const geojsonUrl = version === 'V2' ? 'assets/Interactive Map/Map DATA/fer-geojson_V2.js' : 'assets/Interactive Map/Map DATA/fer-geojson.js';
            await loadScript(geojsonUrl);

            // 2. Fetch and evaluate streetview data
            const svUrl = `https://raw.githubusercontent.com/aduskaaa/fer-streetview/main/${version}/data.js`;
            const svResponse = await fetch(svUrl);
            if (!svResponse.ok) {
                throw new Error(`Failed to fetch streetview data: ${svResponse.statusText}`);
            }
            const svText = await svResponse.text();
            const startIndex = svText.indexOf('[');
            const endIndex = svText.lastIndexOf(']');
            if (startIndex !== -1 && endIndex !== -1) {
                const jsonString = svText.substring(startIndex, endIndex + 1);
                window.streetview_data = JSON.parse(jsonString);
            } else {
                throw new Error("Invalid data.js format");
            }
        } catch (err) {
            console.warn("Error loading version data, falling back:", err);
        }

        // Process loaded data
        if (window.FER_DATA && window.FER_DATA.features) {
            processData(window.FER_DATA.features);
        }
        if (window.streetview_data) {
            processStreetView();
        }
        updateLegendCounts();
        initializeView();
        
        loader.style.display = 'none';
        requestAnimationFrame(render);
    }

    function getRoadTier(f) {
        if (!f) return 'asphalt';
        if (f._roadTier) return f._roadTier;
        const p = f.properties || {};
        if (p.secret) return 'secret';
        const lt = p.lookToken || '';
        if (lt.includes('balt38') || lt.includes('balt39')) return 'minim_center';
        if (lt.includes('min')) return 'minim';
        if (lt.includes('nar')) return 'dirt_narrow_un';
        if (lt.includes('balt43') || lt.includes('balt13') || lt.includes('blke') || p.roadType === 'divided') return 'asphalt_2lane';
        return 'asphalt';
    }

    function updateLegendCounts() {
        let roadsCount = 0, secretCount = 0;
        state.layers.roads.forEach(f => {
            if (f.properties && f.properties.secret) secretCount++;
            else roadsCount++;
        });
        const setEl = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
        };
        setEl('count-tier-roads', roadsCount);
        setEl('count-tier-secret', secretCount);
        setEl('count-tier-ferry', state.layers.ferries ? state.layers.ferries.length : 0);
        setEl('count-tier-sv', svPolylines ? svPolylines.length : (state.layers.streetview ? state.layers.streetview.length : 0));
    }

    async function start() {
        if (window.FER_DATA_LOADING) await window.FER_DATA_LOADING;

        // Load background image (uses high-resolution WebP, falls back to PNG)
        const bgImg = new Image();
        bgImg.src = 'imgs/mapbg_russia.webp';
        bgImg.onload = () => {
            state.background.image = bgImg;
            state.background.isLoaded = true;
            state.background.centerLon = 105.0;
            state.background.centerLat = 61.0;
            state.background.widthInMapUnits = 170.0;
            state.background.heightInMapUnits = 42.0;
            requestAnimationFrame(render);
        };
        bgImg.onerror = () => {
            const fallbackImg = new Image();
            fallbackImg.src = 'imgs/mapbg.png';
            fallbackImg.onload = () => {
                state.background.image = fallbackImg;
                state.background.isLoaded = true;
                state.background.centerLon = 105.0;
                state.background.centerLat = 61.0;
                state.background.widthInMapUnits = 170.0;
                state.background.heightInMapUnits = 42.0;
                requestAnimationFrame(render);
            };
            fallbackImg.onerror = () => {
                console.error('Background Debug: Failed to load background image: imgs/mapbg.png');
                state.background.isLoaded = false;
            };
        };

        setupToggles();
        await loadDataset(state.version);
    }

    let svTypicalSpacing = 0; // typical world-pixel distance between consecutive streetview points

    function processStreetView() {
        if (window.streetview_data) {
            window.streetview_data.forEach(sv => {
                const feature = {
                    type: "Feature",
                    properties: {
                        type: "streetview",
                        id: sv.id,
                        file: sv.file,
                        truck_rotation: sv.truck_rotation
                    },
                    geometry: { type: "Point", coordinates: [sv.lon, sv.lat] },
                    _bounds: { minX: sv.lon, maxX: sv.lon, minY: sv.lat, maxY: sv.lat }
                };
                feature.properties.lodPriority = svLodPriority(sv.id);
                feature._idx = state.layers.streetview.length; // index for openStreetViewModal
                state.layers.streetview.push(feature);
            });
            computeStreetviewSpacing();
            buildStreetviewPolylines();
        }
    }

    // Groups of consecutive streetview points forming continuous road lines.
    // A new group starts when ids are not sequential or the gap is too large.
    let svPolylines = [];

    function buildStreetviewPolylines() {
        svPolylines = [];
        const pts = state.layers.streetview;
        if (pts.length === 0) return;
        const maxGap = svTypicalSpacing * 6;

        const makeGroup = (points) => {
            let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
            points.forEach(f => {
                const c = f.geometry.coordinates;
                if (c[0] < minX) minX = c[0]; if (c[0] > maxX) maxX = c[0];
                if (c[1] < minY) minY = c[1]; if (c[1] > maxY) maxY = c[1];
            });
            return { points, _bounds: { minX, minY, maxX, maxY } };
        };

        let current = [pts[0]];
        for (let i = 1; i < pts.length; i++) {
            const prev = pts[i - 1], cur = pts[i];
            const a = transform(prev.geometry.coordinates[0], prev.geometry.coordinates[1]);
            const b = transform(cur.geometry.coordinates[0], cur.geometry.coordinates[1]);
            const isSequential = cur.properties.id - prev.properties.id === 1;
            if (isSequential && Math.hypot(b.x - a.x, b.y - a.y) < maxGap) {
                current.push(cur);
            } else {
                svPolylines.push(makeGroup(current));
                current = [cur];
            }
        }
        svPolylines.push(makeGroup(current));
    }

    function computeStreetviewSpacing() {
        // Median distance between consecutive-id points (median ignores jumps between roads)
        const dists = [];
        const pts = state.layers.streetview;
        for (let i = 1; i < pts.length; i++) {
            if (pts[i].properties.id - pts[i - 1].properties.id !== 1) continue;
            const a = transform(pts[i - 1].geometry.coordinates[0], pts[i - 1].geometry.coordinates[1]);
            const b = transform(pts[i].geometry.coordinates[0], pts[i].geometry.coordinates[1]);
            dists.push(Math.hypot(b.x - a.x, b.y - a.y));
        }
        if (dists.length === 0) return;
        dists.sort((a, b) => a - b);
        svTypicalSpacing = dists[Math.floor(dists.length / 2)];
    }

    // LOD priority from the bit-reversed id (van der Corput sequence): a dot is
    // visible when its priority < visible fraction. Subsets are nested (zooming
    // in only adds dots, never reshuffles) and stay evenly spaced along the road.
    function svLodPriority(id) {
        let v = 0, n = id >>> 0;
        for (let i = 0; i < 16; i++) { v = (v << 1) | (n & 1); n >>>= 1; }
        return v / 65536; // [0, 1)
    }

    // Fraction of streetview dots to show at the current zoom, so dots stay
    // ~minScreenSpacing px apart on screen. Continuous — no discrete jumps.
    function getStreetviewLodFraction() {
        if (!svTypicalSpacing) return 1;
        const minScreenSpacing = 14;
        return Math.min(1, (svTypicalSpacing * state.zoom) / minScreenSpacing);
    }

    function setupToggles() {
        // Add the new background toggle
        const backgroundToggle = document.getElementById('toggle-background');
        if (backgroundToggle) {
            backgroundToggle.onchange = (e) => {
                state.toggles.background = e.target.checked;
                requestAnimationFrame(render);
            };
            state.toggles.background = backgroundToggle.checked;
        } else {
            console.error('Background Debug: HTML element with id "toggle-background" not found!');
        }

        // Add the new streetview toggle
        const streetviewToggle = document.getElementById('toggle-streetview');
        if (streetviewToggle) {
            streetviewToggle.onchange = (e) => {
                state.toggles.streetview = e.target.checked;
                requestAnimationFrame(render);
            };
            state.toggles.streetview = streetviewToggle.checked;
        } else {
            console.error('Streetview Debug: HTML element with id "toggle-streetview" not found!');
        }

        // Add the dataset version selector
        const versionSelect = document.getElementById('map-version-select');
        if (versionSelect) {
            versionSelect.onchange = (e) => {
                loadDataset(e.target.value);
            };
            versionSelect.value = state.version;
        }

        // Zoom In button
        const zoomInBtn = document.getElementById('btn-zoom-in');
        if (zoomInBtn) {
            zoomInBtn.onclick = () => {
                const factor = 1.35;
                const mouseX = canvas.width / 2, mouseY = canvas.height / 2;
                const worldX = (mouseX - state.viewX) / state.zoom;
                const worldY = (mouseY - state.viewY) / state.zoom;
                state.zoom = Math.min(state.maxZoom, state.zoom * factor);
                state.viewX = mouseX - worldX * state.zoom;
                state.viewY = mouseY - worldY * state.zoom;
                clampView();
                requestAnimationFrame(render);
            };
        }

        // Zoom Out button
        const zoomOutBtn = document.getElementById('btn-zoom-out');
        if (zoomOutBtn) {
            zoomOutBtn.onclick = () => {
                const factor = 0.74;
                const mouseX = canvas.width / 2, mouseY = canvas.height / 2;
                const worldX = (mouseX - state.viewX) / state.zoom;
                const worldY = (mouseY - state.viewY) / state.zoom;
                state.zoom = Math.max(state.minZoom, state.zoom * factor);
                state.viewX = mouseX - worldX * state.zoom;
                state.viewY = mouseY - worldY * state.zoom;
                clampView();
                requestAnimationFrame(render);
            };
        }

        // Fit / Reset button
        const zoomFitBtn = document.getElementById('btn-zoom-fit');
        if (zoomFitBtn) {
            zoomFitBtn.onclick = () => {
                initializeView();
                requestAnimationFrame(render);
            };
        }
    }

    function processData(features) {
        features.forEach(feature => {
            if (!feature.geometry) return;
            const bounds = getBounds(feature.geometry);
            feature._bounds = bounds;

            const type = feature.properties.type;
            let layerKey = type + 's';
            if (type === 'city') layerKey = 'cities';
            else if (type === 'ferry') layerKey = 'ferries';
            else if (type === 'mapArea') layerKey = 'mapAreas';

            if (state.layers[layerKey]) {
                state.layers[layerKey].push(feature);
            }
        });

        // Automatically resolve invisible / prefab roads to match their connected road tier
        propagateInvisibleRoadTiers(state.layers.roads);
    }

    function propagateInvisibleRoadTiers(roads) {
        // Step 1: Assign explicit tiers
        roads.forEach(r => {
            const p = r.properties || {};
            if (p.secret) {
                r._roadTier = 'secret';
            } else if (p.lookToken) {
                const lt = p.lookToken;
                if (lt.includes('balt38') || lt.includes('balt39')) r._roadTier = 'minim_center';
                else if (lt.includes('min')) r._roadTier = 'minim';
                else if (lt.includes('nar')) r._roadTier = 'dirt_narrow_un';
                else if (lt.includes('balt43') || lt.includes('balt13') || lt.includes('blke') || p.roadType === 'divided') r._roadTier = 'asphalt_2lane';
                else r._roadTier = 'asphalt';
            } else {
                r._roadTier = null; // Invisible road: will inherit from connected road
            }
        });

        // Step 2: Build node UID graph
        const nodeMap = new Map();
        roads.forEach(r => {
            const s = r.properties && r.properties.startNodeUid;
            const e = r.properties && r.properties.endNodeUid;
            if (s) {
                if (!nodeMap.has(s)) nodeMap.set(s, []);
                nodeMap.get(s).push(r);
            }
            if (e) {
                if (!nodeMap.has(e)) nodeMap.set(e, []);
                nodeMap.get(e).push(r);
            }
        });

        // Step 3: Multi-pass BFS propagation across connected nodes
        let changed = true;
        let passes = 0;
        while (changed && passes < 15) {
            changed = false;
            passes++;
            roads.forEach(r => {
                if (!r._roadTier) {
                    const s = r.properties && r.properties.startNodeUid;
                    const e = r.properties && r.properties.endNodeUid;
                    const neighbors = [];
                    if (s && nodeMap.has(s)) neighbors.push(...nodeMap.get(s));
                    if (e && nodeMap.has(e)) neighbors.push(...nodeMap.get(e));
                    for (let i = 0; i < neighbors.length; i++) {
                        if (neighbors[i]._roadTier) {
                            r._roadTier = neighbors[i]._roadTier;
                            changed = true;
                            break;
                        }
                    }
                }
            });
        }

        // Step 4: Proximity fallback for any orphaned connector segments
        const unassigned = roads.filter(r => !r._roadTier);
        const assigned = roads.filter(r => !!r._roadTier);
        if (unassigned.length > 0 && assigned.length > 0) {
            unassigned.forEach(r => {
                const pts = r.geometry && r.geometry.coordinates;
                if (!pts || pts.length === 0) {
                    r._roadTier = 'asphalt';
                    return;
                }
                const p1 = pts[0], p2 = pts[pts.length - 1];
                let bestDist = 0.08;
                let bestTier = 'asphalt';
                assigned.forEach(a => {
                    const apts = a.geometry && a.geometry.coordinates;
                    if (!apts || apts.length === 0) return;
                    const a1 = apts[0], a2 = apts[apts.length - 1];
                    const d = Math.min(
                        Math.hypot(p1[0] - a1[0], p1[1] - a1[1]),
                        Math.hypot(p1[0] - a2[0], p1[1] - a2[1]),
                        Math.hypot(p2[0] - a1[0], p2[1] - a1[1]),
                        Math.hypot(p2[0] - a2[0], p2[1] - a2[1])
                    );
                    if (d < bestDist) {
                        bestDist = d;
                        bestTier = a._roadTier;
                    }
                });
                r._roadTier = bestTier;
            });
        }
    }

    function getBounds(geometry) {
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        function traverse(coords) {
            if (typeof coords[0] === 'number') {
                const x = coords[0], y = coords[1];
                if (x < minX) minX = x; if (x > maxX) maxX = x;
                if (y < minY) minY = y; if (y > maxY) maxY = y;
            } else {
                for (let i = 0; i < coords.length; i++) traverse(coords[i]);
            }
        }
        traverse(geometry.coordinates);
        return { minX, minY, maxX, maxY };
    }

    function precomputeGeometry(geom) {
        if (!geom || !geom.coordinates) return null;
        const type = geom.type;
        if (type === 'Point') {
            const p = transform(geom.coordinates[0], geom.coordinates[1]);
            return { type, p, wBounds: { minX: p.x, maxX: p.x, minY: p.y, maxY: p.y } };
        }
        if (type === 'LineString') {
            const pts = [];
            let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
            const coords = geom.coordinates;
            for (let i = 0; i < coords.length; i++) {
                const p = transform(coords[i][0], coords[i][1]);
                pts.push(p);
                if (p.x < minX) minX = p.x; if (p.x > maxX) maxX = p.x;
                if (p.y < minY) minY = p.y; if (p.y > maxY) maxY = p.y;
            }
            return { type, pts, wBounds: { minX, maxX, minY, maxY } };
        }
        if (type === 'Polygon' || type === 'MultiLineString') {
            const rings = [];
            let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
            const coords = geom.coordinates;
            for (let r = 0; r < coords.length; r++) {
                const ring = coords[r];
                const pts = [];
                for (let i = 0; i < ring.length; i++) {
                    const p = transform(ring[i][0], ring[i][1]);
                    pts.push(p);
                    if (p.x < minX) minX = p.x; if (p.x > maxX) maxX = p.x;
                    if (p.y < minY) minY = p.y; if (p.y > maxY) maxY = p.y;
                }
                rings.push(pts);
            }
            return { type, rings, wBounds: { minX, maxX, minY, maxY } };
        }
        return null;
    }

    function precomputeAllGeometries() {
        Object.values(state.layers).forEach(layer => {
            layer.forEach(f => {
                if (f.geometry) f._geom = precomputeGeometry(f.geometry);
            });
        });
    }

    function initializeView() {
        let totalMinX = Infinity, totalMaxX = -Infinity, totalMinY = Infinity, totalMaxY = -Infinity;
        Object.values(state.layers).forEach(layer => {
            layer.forEach(f => {
                // Ensure valid bounds exist before updating totals
                if (f._bounds && typeof f._bounds.minX === 'number' && isFinite(f._bounds.minX)) {
                    const b = f._bounds;
                    if (b.minX < totalMinX) totalMinX = b.minX;
                    if (b.maxX > totalMaxX) totalMaxX = b.maxX;
                    if (b.minY < totalMinY) totalMinY = b.minY;
                    if (b.maxY > totalMaxY) totalMaxY = b.maxY;
                }
            });
        });

        // Fallback if no valid map data was loaded to prevent NaN
        if (!isFinite(totalMinX) || !isFinite(totalMaxX) || !isFinite(totalMinY) || !isFinite(totalMaxY) || (totalMaxX - totalMinX === 0) || (totalMaxY - totalMinY === 0)) {
            console.warn('No valid map features found or map dimensions are zero for initialization. Using default view and calibration.');
            state.calibration.ox = 0;
            state.calibration.oy = 0;
            state.zoom = 1.0;
            state.viewX = canvas.width / 2;
            state.viewY = canvas.height / 2;
        } else {
            const cx = (totalMinX + totalMaxX) / 2;
            const cy = (totalMinY + totalMaxY) / 2;
            state.calibration.ox = -cx;
            state.calibration.oy = -cy;

            // Precompute transformed fast points for all loaded features with calibration
            precomputeAllGeometries();

            const widthPx = (totalMaxX - totalMinX) * state.calibration.sx;
            const heightPx = (totalMaxY - totalMinY) * Math.abs(state.calibration.sy);

            const zoomX = canvas.width / widthPx;
            const zoomY = canvas.height / heightPx;
            state.zoom = Math.min(zoomX, zoomY) * 0.8;

            // Zoom limits: out to slightly past the whole map, in until consecutive
            // streetview captures are ~120px apart on screen
            state.minZoom = state.zoom * 0.85;
            state.maxZoom = svTypicalSpacing
                ? Math.max(state.zoom * 50, 120 / svTypicalSpacing)
                : state.zoom * 200;

            state.viewX = canvas.width / 2;
            state.viewY = canvas.height / 2;

            // Map extent in world pixels, used to clamp panning
            const wc1 = transform(totalMinX, totalMinY);
            const wc2 = transform(totalMaxX, totalMaxY);
            worldBounds = {
                minX: Math.min(wc1.x, wc2.x), maxX: Math.max(wc1.x, wc2.x),
                minY: Math.min(wc1.y, wc2.y), maxY: Math.max(wc1.y, wc2.y)
            };
        }

        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 800);

        requestAnimationFrame(render);
    }

    // --- Interaction ---
    let worldBounds = null;

    // Keep the viewport inside the background PNG — panning can never reveal
    // the empty space beyond the image edges. Falls back to the data extent
    // if the background image is not loaded.
    function clampView() {
        let b = worldBounds;
        const bg = state.background;
        if (bg.isLoaded) {
            const p = transform(bg.centerLon, bg.centerLat);
            const w = bg.widthInMapUnits * state.calibration.sx;
            const h = bg.heightInMapUnits * Math.abs(state.calibration.sy);
            b = { minX: p.x - w / 2, maxX: p.x + w / 2, minY: p.y - h / 2, maxY: p.y + h / 2 };
        }
        if (!b) return;
        const z = state.zoom;

        // viewX range where the image still covers the whole viewport width
        const minViewX = canvas.width - b.maxX * z;
        const maxViewX = -b.minX * z;
        if (minViewX > maxViewX) {
            // image narrower than viewport at this zoom → keep it centered
            state.viewX = (minViewX + maxViewX) / 2;
        } else {
            state.viewX = Math.max(minViewX, Math.min(maxViewX, state.viewX));
        }

        const minViewY = canvas.height - b.maxY * z;
        const maxViewY = -b.minY * z;
        if (minViewY > maxViewY) {
            state.viewY = (minViewY + maxViewY) / 2;
        } else {
            state.viewY = Math.max(minViewY, Math.min(maxViewY, state.viewY));
        }
    }

    function resize() {
        const frame = document.getElementById('map-viewport-frame') || canvas.parentElement;
        const width = frame ? frame.clientWidth : window.innerWidth;
        const height = frame ? frame.clientHeight : (window.innerHeight - 62);
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
        }
        clampView();
        requestAnimationFrame(render);
    }
    window.addEventListener('resize', resize);
    resize();

    function getCanvasPos(e) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    let isDragging = false, lastX, lastY;
    canvas.onmousedown = (e) => {
        if (e.button !== 0) return;
        isDragging = true; lastX = e.clientX; lastY = e.clientY;
        canvas.style.cursor = 'grabbing';
        ctxMenu.style.display = 'none';
    };
    window.onmouseup = () => { isDragging = false; canvas.style.cursor = 'grab'; };
    window.onmousemove = (e) => {
        if (!isDragging) return;
        state.viewX += e.clientX - lastX;
        state.viewY += e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
        clampView();
        requestAnimationFrame(render);
    };

    canvas.onwheel = (e) => {
        e.preventDefault();
        const factor = e.deltaY > 0 ? 0.85 : 1.15;
        const pos = getCanvasPos(e);
        const worldX = (pos.x - state.viewX) / state.zoom;
        const worldY = (pos.y - state.viewY) / state.zoom;
        state.zoom *= factor;
        state.zoom = Math.max(state.minZoom, Math.min(state.maxZoom, state.zoom));
        state.viewX = pos.x - worldX * state.zoom;
        state.viewY = pos.y - worldY * state.zoom;
        clampView();
        requestAnimationFrame(render);
    };

    // Right Click for Coordinates (Google Maps format)
    canvas.oncontextmenu = (e) => {
        e.preventDefault();
        const pos = getCanvasPos(e);

        // Convert screen pixel to map Lon/Lat
        const worldX = (pos.x - state.viewX) / state.zoom;
        const worldY = (pos.y - state.viewY) / state.zoom;

        const coords = getCoordsFromPixel(worldX, worldY);

        // Position popup inside canvas bounds
        const menuX = Math.min(pos.x, canvas.width - 210);
        const menuY = Math.min(pos.y, canvas.height - 110);
        ctxMenu.style.left = menuX + 'px';
        ctxMenu.style.top = menuY + 'px';
        ctxMenu.style.display = 'block';

        // Google Maps standard format: Latitude, Longitude (e.g. 62.033889, 129.733056)
        coordsDisplay.textContent = `${coords.lat.toFixed(6)}, ${coords.lon.toFixed(6)}`;
    };

    function getCoordsFromPixel(px, py) {
        const c = state.calibration;
        // Invert Scaling
        const rx = px / c.sx;
        const ry = py / c.sy;

        // Invert Rotation (simplified for rot=0)
        let tx = rx, ty = ry;
        if (c.rot !== 0) {
            const rad = -c.rot * Math.PI / 180; // Negative rotation
            const cos = Math.cos(rad), sin = Math.sin(rad);
            tx = rx * cos - ry * sin;
            ty = rx * sin + ry * cos;
        }

        // Invert Translation to get base game map Lon/Lat
        const geoLon = tx - c.ox;
        const geoLat = ty - c.oy;

        // Real-world WGS84 Google Maps calibration (corrects ETS2 projection datum offset)
        const realLat = 1.893515 + (0.985746 * geoLat) + (-0.005087 * geoLon);
        const realLon = 0.325871 + (-0.011218 * geoLat) + (1.006070 * geoLon);

        return {
            lon: realLon,
            lat: realLat
        };
    }

    // Haversine formula to calculate distance between two points on a sphere
    function getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of Earth in kilometers
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d;
    }

    canvas.onclick = (e) => {
        const pos = getCanvasPos(e);
        const mouseX = pos.x;
        const mouseY = pos.y;
        ctxMenu.style.display = 'none';

        if (state.toggles.streetview) {
            // Find the streetview capture nearest to the click, measured against
            // the coverage line segments (so clicking anywhere on the line works)
            const clickThreshold = 12;
            let best = { dist: Infinity, index: -1 };

            const toScreen = (f) => {
                const p = transform(f.geometry.coordinates[0], f.geometry.coordinates[1]);
                return { x: p.x * state.zoom + state.viewX, y: p.y * state.zoom + state.viewY };
            };

            svPolylines.forEach(line => {
                const pts = line.points;
                if (pts.length === 1) {
                    const s = toScreen(pts[0]);
                    const d = Math.hypot(mouseX - s.x, mouseY - s.y);
                    if (d < best.dist) best = { dist: d, index: pts[0]._idx };
                    return;
                }
                let prev = toScreen(pts[0]);
                for (let i = 1; i < pts.length; i++) {
                    const cur = toScreen(pts[i]);
                    const dx = cur.x - prev.x, dy = cur.y - prev.y;
                    const len2 = dx * dx + dy * dy;
                    let t = len2 ? ((mouseX - prev.x) * dx + (mouseY - prev.y) * dy) / len2 : 0;
                    t = Math.max(0, Math.min(1, t));
                    const d = Math.hypot(mouseX - (prev.x + t * dx), mouseY - (prev.y + t * dy));
                    if (d < best.dist) {
                        best = { dist: d, index: (t < 0.5 ? pts[i - 1] : pts[i])._idx };
                    }
                    prev = cur;
                }
            });

            if (best.dist < clickThreshold && best.index !== -1) {
                openStreetViewModal(best.index);
            }
        }
    };

    let currentStreetViewIndex = 0;
    const streetviewModal = document.getElementById('streetview-modal');
    const modalStreetViewImg = document.getElementById('modal-streetview-img');
    const streetviewTurnAroundBtn = document.getElementById('streetview-turn-around');
    const streetviewArrowsOverlay = document.getElementById('streetview-arrows-overlay');
    const svHudSubtitle = document.getElementById('sv-hud-subtitle');
    const minimapCanvas = document.getElementById('sv-minimap');
    let minimapCtx = minimapCanvas ? minimapCanvas.getContext('2d') : null;

    function openStreetViewModal(index) {
        currentStreetViewIndex = index;
        updateStreetViewModal();
        streetviewModal.style.display = 'block';
        setTimeout(() => resizeMinimap(), 100);

        // Bind parallax tracking uniquely once
        if (!streetviewModal.parallaxBound) {
            streetviewModal.parallaxBound = true;
            streetviewModal.addEventListener('mousemove', (e) => {
                if (streetviewModal.style.display === 'none') return;
                const rect = streetviewModal.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
                const y = (e.clientY - rect.top) / rect.height - 0.5;

                // Add a subtle inverted pan and zoom to the background image
                modalStreetViewImg.style.transform = `scale(1.15) translate(${x * -35}px, ${y * -20}px)`;

                // Add a sweeping perspective shift to the navigation cluster and paths
                const overlay = document.getElementById('streetview-arrows-overlay');
                if (overlay && overlay.firstChild) {
                    overlay.firstChild.style.transform = `translateX(calc(-50% + ${x * -40}px)) perspective(600px) rotateX(70deg) rotateZ(${x * 15}deg) rotateY(${x * -25}deg)`;
                }
            });
        }
    }

    function resizeMinimap() {
        if (!minimapCanvas) return;
        const rect = minimapCanvas.parentElement.getBoundingClientRect();
        minimapCanvas.width = rect.width;
        minimapCanvas.height = rect.height;
        drawMinimap();
    }

    function updateStreetViewModal() {
        if (streetviewArrowsOverlay) streetviewArrowsOverlay.innerHTML = '';
        const currentSV = state.layers.streetview[currentStreetViewIndex];
        if (!currentSV) return;

        // Smooth fade out
        modalStreetViewImg.style.opacity = 0;
        setTimeout(() => {
            modalStreetViewImg.onload = () => {
                modalStreetViewImg.style.opacity = 1;
            };
            modalStreetViewImg.src = `https://raw.githubusercontent.com/aduskaaa/fer-streetview/main/${state.version}/${currentSV.properties.file}`;
            if (modalStreetViewImg.complete) {
                modalStreetViewImg.onload();
            }
        }, 150);

        if (svHudSubtitle) {
            svHudSubtitle.innerText = `Lat: ${currentSV.geometry.coordinates[1].toFixed(5)} • Lon: ${currentSV.geometry.coordinates[0].toFixed(5)}`;
        }

        const currentLon = currentSV.geometry.coordinates[0];
        const currentLat = currentSV.geometry.coordinates[1];
        let currentRotation = currentSV.properties.truck_rotation * Math.PI * 2;

        const searchRadiusKm = 10.0;
        const coordsTolerance = 0.01;

        let targetTaRotation = currentRotation + Math.PI;
        if (targetTaRotation > 2 * Math.PI) targetTaRotation -= 2 * Math.PI;

        const currentId = currentSV.properties.id;

        // Compute true visual angle by looking at the next road point on the canvas!
        const pCenter = transform(currentLon, currentLat);
        let actualTruckRotation = currentRotation; // fallback
        let nextSV = state.layers.streetview.find(s => s.properties.id === currentId + 1);
        if (!nextSV) nextSV = state.layers.streetview.find(s => s.properties.id === currentId - 1);
        if (nextSV) {
            const pNext = transform(nextSV.geometry.coordinates[0], nextSV.geometry.coordinates[1]);
            let dy = pNext.y - pCenter.y;
            let dx = pNext.x - pCenter.x;
            actualTruckRotation = Math.atan2(dx, -dy);
            if (nextSV.properties.id === currentId - 1) actualTruckRotation += Math.PI;
        }

        // Turn around best match variables
        let taBestIndex = -1;
        let taMinDiff = Infinity;

        let bestOptions = {
            forward: { index: -1, score: -Infinity, angle: 0 },
            left: { index: -1, score: -Infinity, angle: 0 },
            right: { index: -1, score: -Infinity, angle: 0 },
            backward: { index: -1, score: -Infinity, angle: 0 }
        };

        state.layers.streetview.forEach((sv, index) => {
            if (index === currentStreetViewIndex) return;

            const svLon = sv.geometry.coordinates[0];
            const svLat = sv.geometry.coordinates[1];

            if (Math.abs(svLon - currentLon) < 0.00001 && Math.abs(svLat - currentLat) < 0.00001) return;

            const distance = getDistance(currentLat, currentLon, svLat, svLon);
            const targetId = sv.properties.id;

            // Restrict intersections to very close points (800m) to prevent teleporting far away.
            const isSequence = Math.abs(targetId - currentId) === 1;
            if (!isSequence && distance > 0.8) return;
            if (isSequence && distance > 10.0) return;

            const targetRotation = sv.properties.truck_rotation * Math.PI * 2;

            // Turn around logic uses the telemetry diff since it cancels out offsets
            if (distance < 0.8) {
                const rotationDiff = Math.abs(targetRotation - targetTaRotation);
                const normalizedRotationDiff = Math.min(rotationDiff, 2 * Math.PI - rotationDiff);
                if (normalizedRotationDiff < taMinDiff && normalizedRotationDiff < Math.PI / 2) {
                    taMinDiff = normalizedRotationDiff;
                    taBestIndex = index;
                }
            }

            // Calculate bearing strictly on the visual Canvas plane
            const pTarget = transform(svLon, svLat);
            let tdy = pTarget.y - pCenter.y;
            let tdx = pTarget.x - pCenter.x;
            let bearing = Math.atan2(tdx, -tdy); // 0 is UP, PI/2 is RIGHT
            if (bearing < 0) bearing += 2 * Math.PI;

            let relativeAngle = bearing - actualTruckRotation;
            if (relativeAngle > Math.PI) relativeAngle -= 2 * Math.PI;
            if (relativeAngle < -Math.PI) relativeAngle += 2 * Math.PI;

            // Rotation diff (for filtering backward-facing captures at intersections)
            let rotDiff = targetRotation - currentRotation;
            if (rotDiff > Math.PI) rotDiff -= 2 * Math.PI;
            if (rotDiff < -Math.PI) rotDiff += 2 * Math.PI;
            const absRotDiff = Math.abs(rotDiff);

            // Strict sequence override handles road bends and sparse gaps perfectly
            if (targetId === currentId + 1) {
                bestOptions.forward.score = Infinity;
                bestOptions.forward.index = index;
                bestOptions.forward.angle = relativeAngle;
                return;
            }
            if (targetId === currentId - 1) {
                bestOptions.backward.score = Infinity;
                bestOptions.backward.index = index;
                bestOptions.backward.angle = relativeAngle;
                return;
            }

            // Base score: heavily penalize distance
            let score = - (distance * 1000);

            // Fallback geometric logic for branching / intersections
            if (Math.abs(relativeAngle) < Math.PI / 3) { // 60 deg cone
                if (absRotDiff < Math.PI / 2) {
                    let fScore = score - absRotDiff * 10;
                    if (fScore > bestOptions.forward.score && bestOptions.forward.score !== Infinity) {
                        bestOptions.forward.score = fScore;
                        bestOptions.forward.index = index;
                        bestOptions.forward.angle = relativeAngle;
                    }
                }
            } else if (relativeAngle >= Math.PI / 3 && relativeAngle <= 2 * Math.PI / 3) {
                // Right (60 to 120 deg)
                if (score > bestOptions.right.score) {
                    bestOptions.right.score = score;
                    bestOptions.right.index = index;
                    bestOptions.right.angle = relativeAngle;
                }
            } else if (relativeAngle <= -Math.PI / 3 && relativeAngle >= -2 * Math.PI / 3) {
                // Left (-60 to -120 deg)
                if (score > bestOptions.left.score) {
                    bestOptions.left.score = score;
                    bestOptions.left.index = index;
                    bestOptions.left.angle = relativeAngle;
                }
            } else if (Math.abs(relativeAngle) > 2 * Math.PI / 3) {
                // Backward
                if (absRotDiff < Math.PI / 2) {
                    let bScore = score - absRotDiff * 10;
                    if (bScore > bestOptions.backward.score && bestOptions.backward.score !== Infinity) {
                        bestOptions.backward.score = bScore;
                        bestOptions.backward.index = index;
                        bestOptions.backward.angle = relativeAngle;
                    }
                }
            }
        });

        // Construct the 3D-perspective ground navigation cluster
        const clusterWrap = document.createElement('div');
        clusterWrap.style.cssText = `
            position: absolute;
            bottom: 12%;
            left: 50%;
            width: 0px;
            height: 0px;
            transform: translateX(-50%) perspective(600px) rotateX(70deg);
            pointer-events: none;
            z-index: 2000;
        `;

        // Turn Around Button in exact center
        const centerTa = document.createElement('div');
        centerTa.style.cssText = `
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 70px; height: 70px;
            background: rgba(0,0,0,0.5);
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255,255,255,0.7);
            border-radius: 50%;
            pointer-events: auto;
            cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            color: #fff; font-size: 28px; font-weight: bold;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 10px 30px rgba(0,0,0,0.8), inset 0 0 15px rgba(255,255,255,0.2);
        `;
        centerTa.innerHTML = '&#x21bb;';
        centerTa.onclick = () => {
            if (taBestIndex !== -1) {
                openStreetViewModal(taBestIndex);
            } else {
                centerTa.style.background = "#e74c3c";
                setTimeout(() => centerTa.style.background = "rgba(0,0,0,0.5)", 800);
            }
        };
        centerTa.onmouseover = () => { centerTa.style.transform = 'translate(-50%, -50%) scale(1.15)'; centerTa.style.background = 'rgba(255,255,255,0.2)'; };
        centerTa.onmouseout = () => { centerTa.style.transform = 'translate(-50%, -50%) scale(1)'; centerTa.style.background = 'rgba(0,0,0,0.5)'; };
        clusterWrap.appendChild(centerTa);

        // Sleek Map-style ground chevron
        const modernIcon = `<svg width="40" height="40" viewBox="0 0 100 100" style="filter: drop-shadow(0 -5px 15px rgba(255,255,255,0.7)) drop-shadow(0 5px 5px rgba(0,0,0,0.9));"><path d="M10,80 L50,15 L90,80 L50,60 Z" fill="rgba(255,255,255,1)" stroke="rgba(0,0,0,0.3)" stroke-width="2"/></svg>`;

        ['forward', 'left', 'right', 'backward'].forEach(dir => {
            if (bestOptions[dir].index !== -1 && streetviewArrowsOverlay) {
                let rotRad = bestOptions[dir].angle;
                let rotDeg = rotRad * 180 / Math.PI;

                // Path Line connecting center to chevron
                const pathLine = document.createElement('div');
                pathLine.style.cssText = `
                    position: absolute;
                    bottom: 50%; left: 50%;
                    width: 6px; height: 160px;
                    background: linear-gradient(to top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%);
                    transform-origin: bottom center;
                    transform: translateX(-50%) rotate(${rotDeg}deg) translateY(-40px);
                    border-radius: 4px;
                    box-shadow: 0 0 15px rgba(0,0,0,0.8);
                    opacity: 0.5;
                    transition: all 0.3s ease;
                    pointer-events: none;
                `;
                clusterWrap.appendChild(pathLine);

                const arrowContainer = document.createElement('div');
                arrowContainer.style.cssText = `
                    position: absolute; 
                    top: 50%; left: 50%;
                    cursor: pointer; 
                    pointer-events: auto; 
                    opacity: 0.85; 
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
                    display: inline-flex; 
                    transform: translate(-50%, -50%) rotate(${rotDeg}deg) translateY(-205px);
                `;
                arrowContainer.innerHTML = modernIcon;

                arrowContainer.onmouseover = () => {
                    arrowContainer.style.opacity = '1';
                    arrowContainer.style.transform = `translate(-50%, -50%) rotate(${rotDeg}deg) translateY(-205px) scale(1.4)`;
                    pathLine.style.opacity = '1';
                    pathLine.style.background = 'linear-gradient(to top, rgba(255,215,0,0) 0%, rgba(255,215,0,0.9) 100%)';
                    pathLine.style.boxShadow = '0 0 20px rgba(255,215,0,0.8)';
                };
                arrowContainer.onmouseout = () => {
                    arrowContainer.style.opacity = '0.85';
                    arrowContainer.style.transform = `translate(-50%, -50%) rotate(${rotDeg}deg) translateY(-205px) scale(1)`;
                    pathLine.style.opacity = '0.5';
                    pathLine.style.background = 'linear-gradient(to top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%)';
                    pathLine.style.boxShadow = '0 0 15px rgba(0,0,0,0.8)';
                };
                arrowContainer.onclick = () => openStreetViewModal(bestOptions[dir].index);

                clusterWrap.appendChild(arrowContainer);
            }
        });

        if (streetviewArrowsOverlay) {
            streetviewArrowsOverlay.appendChild(clusterWrap);
        }

        drawMinimap();
    }

    function drawMinimap() {
        if (!minimapCtx) return;
        const width = minimapCanvas.width;
        const height = minimapCanvas.height;

        minimapCtx.fillStyle = '#111';
        minimapCtx.fillRect(0, 0, width, height);

        const currentSV = state.layers.streetview[currentStreetViewIndex];
        if (!currentSV) return;

        minimapCtx.save();
        minimapCtx.translate(width / 2, height / 2);

        const mZoom = 3.0;
        const cc = state.calibration;
        const centerPos = transform(currentSV.geometry.coordinates[0], currentSV.geometry.coordinates[1]);

        minimapCtx.scale(mZoom, mZoom);
        minimapCtx.translate(-centerPos.x, -centerPos.y);

        function drawLocalGeom(geom) {
            if (geom.type === 'Point') return;
            const coords = geom.coordinates;
            function dl(points, closed = false) {
                if (points.length < 2) return;
                const p0 = transform(points[0][0], points[0][1]); minimapCtx.moveTo(p0.x, p0.y);
                for (let i = 1; i < points.length; i++) { const p = transform(points[i][0], points[i][1]); minimapCtx.lineTo(p.x, p.y); }
                if (closed) minimapCtx.closePath();
            }
            if (geom.type === 'LineString') dl(coords);
            else if (geom.type === 'Polygon') coords.forEach(ring => dl(ring, true));
            else if (geom.type === 'MultiPolygon') coords.forEach(poly => poly.forEach(ring => dl(ring, true)));
        }

        minimapCtx.beginPath();
        state.layers.roads.forEach(f => {
            const pOpts = f.geometry.coordinates;
            if (!pOpts || pOpts.length === 0) return;
            let checkCoord = pOpts[0];
            if (f.geometry.type === 'MultiPolygon') checkCoord = pOpts[0][0][0];
            if (f.geometry.type === 'Polygon') checkCoord = pOpts[0][0];

            const p = transform(checkCoord[0], checkCoord[1]);
            const dist = Math.hypot(p.x - centerPos.x, p.y - centerPos.y);
            if (dist < (width / mZoom) * 2.5) {
                drawLocalGeom(f.geometry);
            }
        });
        minimapCtx.strokeStyle = "rgba(255,255,255,0.4)";
        minimapCtx.lineWidth = 4 / mZoom;
        minimapCtx.stroke();

        minimapCtx.restore();

        minimapCtx.save();
        minimapCtx.translate(width / 2, height / 2);

        const currentId = currentSV.properties.id;
        const pCenter = transform(currentSV.geometry.coordinates[0], currentSV.geometry.coordinates[1]);
        let actualTruckRotation = currentSV.properties.truck_rotation; // fallback

        let nextSV = state.layers.streetview.find(s => s.properties.id === currentId + 1);
        if (!nextSV) nextSV = state.layers.streetview.find(s => s.properties.id === currentId - 1);
        if (nextSV) {
            const pNext = transform(nextSV.geometry.coordinates[0], nextSV.geometry.coordinates[1]);
            let dy = pNext.y - pCenter.y;
            let dx = pNext.x - pCenter.x;
            actualTruckRotation = Math.atan2(dx, -dy);
            if (nextSV.properties.id === currentId - 1) actualTruckRotation += Math.PI;
        }

        minimapCtx.rotate(actualTruckRotation);

        minimapCtx.beginPath();
        minimapCtx.moveTo(0, 0);
        minimapCtx.arc(0, 0, 70, -Math.PI / 2 - 0.5, -Math.PI / 2 + 0.5, false);
        minimapCtx.lineTo(0, 0);

        const grad = minimapCtx.createRadialGradient(0, 0, 0, 0, 0, 70);
        grad.addColorStop(0, "rgba(255, 215, 0, 0.4)");
        grad.addColorStop(1, "rgba(255, 215, 0, 0.0)");
        minimapCtx.fillStyle = grad;
        minimapCtx.fill();

        minimapCtx.beginPath();
        minimapCtx.arc(0, 0, 5, 0, Math.PI * 2);
        minimapCtx.fillStyle = "#FFD700";
        minimapCtx.fill();
        minimapCtx.lineWidth = 1.5;
        minimapCtx.strokeStyle = "#000";
        minimapCtx.stroke();

        minimapCtx.restore();
    }

    // --- Rendering Core ---
    function transform(lon, lat) {
        const c = state.calibration;
        const tx = lon + c.ox, ty = lat + c.oy;
        let rx = tx, ry = ty;
        if (c.rot !== 0) {
            const rad = c.rot * Math.PI / 180;
            const cos = Math.cos(rad), sin = Math.sin(rad);
            rx = tx * cos - ty * sin; ry = tx * sin + ty * cos;
        }
        return { x: rx * c.sx, y: ry * c.sy };
    }

    function isVisible(featureBounds) {
        const p1 = transform(featureBounds.minX, featureBounds.minY);
        const p2 = transform(featureBounds.maxX, featureBounds.maxY);
        const fMinX = Math.min(p1.x, p2.x) * state.zoom + state.viewX;
        const fMaxX = Math.max(p1.x, p2.x) * state.zoom + state.viewX;
        const fMinY = Math.min(p1.y, p2.y) * state.zoom + state.viewY;
        const fMaxY = Math.max(p1.y, p2.y) * state.zoom + state.viewY;
        return !(fMaxX < 0 || fMinX > canvas.width || fMaxY < 0 || fMinY > canvas.height);
    }

    function updateScaleBar() {
        const scaleLine = document.getElementById('map-scale-line');
        const scaleLabel = document.getElementById('map-scale-label');
        if (!scaleLine || !scaleLabel) return;

        // 1 degree longitude at ~62°N is approx 52.2 km.
        // Screen width for 1 degree lon is (45.0 * state.zoom) pixels.
        const kmPerPx = 52.2 / (45.0 * state.zoom);
        const niceSteps = [2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000];
        let chosenKm = niceSteps[0];
        for (let step of niceSteps) {
            if (step / kmPerPx >= 60) {
                chosenKm = step;
                break;
            }
        }
        const barWidth = Math.max(30, Math.min(220, Math.round(chosenKm / kmPerPx)));
        scaleLine.style.width = barWidth + 'px';
        scaleLabel.textContent = chosenKm >= 1000 ? `${chosenKm / 1000} 000 km` : `${chosenKm} km`;
    }

    function render() {
        ctx.fillStyle = "#0c131d"; ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.save(); ctx.translate(state.viewX, state.viewY); ctx.scale(state.zoom, state.zoom);
        const zoom = state.zoom;
        const detailLevel = zoom > 1.5 ? 2 : (zoom > 0.5 ? 1 : 0);

        // Fast world bounding box culling
        const wViewLeft = -state.viewX / zoom - 30;
        const wViewRight = (canvas.width - state.viewX) / zoom + 30;
        const wViewTop = -state.viewY / zoom - 30;
        const wViewBottom = (canvas.height - state.viewY) / zoom + 30;

        function isVisibleFast(wb) {
            if (!wb) return true;
            return !(wb.maxX < wViewLeft || wb.minX > wViewRight || wb.maxY < wViewTop || wb.minY > wViewBottom);
        }

        // 0. Background Terrain Image
        if (state.toggles.background && state.background.isLoaded && state.background.image) {
            const bg = state.background;
            const p = transform(bg.centerLon, bg.centerLat);
            const width = bg.widthInMapUnits * state.calibration.sx;
            const height = bg.heightInMapUnits * Math.abs(state.calibration.sy);

            ctx.drawImage(
                bg.image,
                p.x - width / 2,
                p.y - height / 2,
                width,
                height
            );
        } else {
            // Draw subtle cartographic grid when background is disabled
            ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
            ctx.lineWidth = 1 / zoom;
            ctx.beginPath();
            for (let lat = 40; lat <= 80; lat += 5) {
                const p1 = transform(20, lat), p2 = transform(190, lat);
                ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
            }
            for (let lon = 20; lon <= 190; lon += 10) {
                const p1 = transform(lon, 40), p2 = transform(lon, 82);
                ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
            }
            ctx.stroke();
        }

        // Helper functions for batched path drawing
        function drawFastLines(list) {
            for (let i = 0; i < list.length; i++) {
                const pts = list[i].pts;
                if (pts && pts.length > 0) {
                    ctx.moveTo(pts[0].x, pts[0].y);
                    for (let j = 1; j < pts.length; j++) {
                        ctx.lineTo(pts[j].x, pts[j].y);
                    }
                }
            }
        }

        function drawFastRings(g) {
            if (g && g.rings) {
                for (let r = 0; r < g.rings.length; r++) {
                    const pts = g.rings[r];
                    if (pts && pts.length > 0) {
                        ctx.moveTo(pts[0].x, pts[0].y);
                        for (let j = 1; j < pts.length; j++) ctx.lineTo(pts[j].x, pts[j].y);
                        ctx.closePath();
                    }
                }
            }
        }

        // 1. Map Areas (Batched by Color)
        const areaColors = { 0: "#18181b", 1: "#1e293b", 2: "#27272a", 3: "#09090b", 4: "#064e3b" };
        const areasByColor = {};
        for (let i = 0; i < state.layers.mapAreas.length; i++) {
            const f = state.layers.mapAreas[i];
            const g = f._geom;
            if (!g || !isVisibleFast(g.wBounds)) continue;
            const c = f.properties.color || 0;
            if (!areasByColor[c]) areasByColor[c] = [];
            areasByColor[c].push(g);
        }
        ctx.strokeStyle = "rgba(0,0,0,0.5)"; ctx.lineWidth = 0.6 / zoom;
        for (let c in areasByColor) {
            ctx.fillStyle = areaColors[c] || areaColors[0];
            ctx.beginPath();
            areasByColor[c].forEach(g => drawFastRings(g));
            ctx.fill(); ctx.stroke();
        }

        // 2. Prefabs (Batched by Color)
        const prefabColors = { 0: "#27272a", 1: "#3f3f46", 2: "#1e293b", 3: "#334155", 4: "#d97706" };
        const prefabsByColor = {};
        for (let i = 0; i < state.layers.prefabs.length; i++) {
            const f = state.layers.prefabs[i];
            const g = f._geom;
            if (!g || !isVisibleFast(g.wBounds)) continue;
            const c = f.properties.color || 1;
            if (!prefabsByColor[c]) prefabsByColor[c] = [];
            prefabsByColor[c].push(g);
        }
        for (let c in prefabsByColor) {
            const isHouse = (c == 2 || c == 3);
            ctx.fillStyle = prefabColors[c] || prefabColors[1];
            ctx.strokeStyle = isHouse ? "#1e293b" : "#18181b";
            ctx.lineWidth = (isHouse ? 1.0 : 0.6) / zoom;
            ctx.beginPath();
            prefabsByColor[c].forEach(g => drawFastRings(g));
            ctx.fill(); ctx.stroke();
        }

        // 3. Roads (Single Batched Draw Calls per Layer)
        ctx.lineCap = "round"; ctx.lineJoin = "round";
        const regularRoads = [];
        const secretRoads = [];
        for (let i = 0; i < state.layers.roads.length; i++) {
            const f = state.layers.roads[i];
            const g = f._geom;
            if (g && isVisibleFast(g.wBounds)) {
                if (f.properties && f.properties.secret) secretRoads.push(g);
                else regularRoads.push(g);
            }
        }

        // Pass A: Road Casings
        // 1. Secret Road Outer Dark Border + Tan Base
        if (secretRoads.length > 0) {
            ctx.beginPath(); drawFastLines(secretRoads);
            ctx.strokeStyle = "#090a0f"; ctx.lineWidth = (detailLevel === 0 ? 7.2 : 5.0) / zoom; ctx.stroke();

            ctx.beginPath(); drawFastLines(secretRoads);
            ctx.strokeStyle = "#d4a373"; ctx.lineWidth = (detailLevel === 0 ? 5.4 : 3.8) / zoom; ctx.stroke();
        }

        // 2. Regular Roads Orange Outline
        if (regularRoads.length > 0) {
            ctx.beginPath(); drawFastLines(regularRoads);
            ctx.strokeStyle = "#ea580c"; ctx.lineWidth = (detailLevel === 0 ? 7.2 : 5.0) / zoom; ctx.stroke();
        }

        // Pass B: Road Fills
        // 1. Regular Roads Yellow Core
        if (regularRoads.length > 0) {
            ctx.beginPath(); drawFastLines(regularRoads);
            ctx.strokeStyle = "#facc15"; ctx.lineWidth = (detailLevel === 0 ? 4.8 : 3.2) / zoom; ctx.stroke();
        }

        // 2. Secret Roads Brown Dashes
        if (secretRoads.length > 0) {
            ctx.beginPath(); drawFastLines(secretRoads);
            ctx.strokeStyle = "#5c3a21"; ctx.lineWidth = (detailLevel === 0 ? 3.2 : 2.2) / zoom;
            ctx.setLineDash([7 / zoom, 4.5 / zoom]); ctx.stroke(); ctx.setLineDash([]);
        }

        // 4. Ferries
        const visibleFerries = [];
        for (let i = 0; i < state.layers.ferries.length; i++) {
            const f = state.layers.ferries[i];
            const g = f._geom;
            if (g && isVisibleFast(g.wBounds)) visibleFerries.push(g);
        }
        if (visibleFerries.length > 0) {
            ctx.beginPath(); drawFastLines(visibleFerries);
            ctx.strokeStyle = "#0284c7"; ctx.lineWidth = (detailLevel === 0 ? 4.2 : 2.8) / zoom;
            ctx.setLineDash([8 / zoom, 5 / zoom]); ctx.stroke(); ctx.setLineDash([]);
        }

        // 5. POIs (Ferry Ports)
        for (let i = 0; i < state.layers.pois.length; i++) {
            const f = state.layers.pois[i];
            const g = f._geom;
            if (!g || !isVisibleFast(g.wBounds)) continue;
            const p = g.p;
            if (f.properties.poiType === 'ferry') {
                const size = 9 / zoom;
                ctx.fillStyle = "#0284c7"; ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 1.8 / zoom;
                ctx.beginPath(); ctx.arc(p.x, p.y, size / 2, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
                if (zoom > 0.5) {
                    ctx.font = `700 ${10 / zoom}px 'JetBrains Mono', monospace`;
                    ctx.fillStyle = "#38bdf8"; ctx.strokeStyle = "#000"; ctx.lineWidth = 3 / zoom;
                    ctx.strokeText(f.properties.poiName || "", p.x, p.y + 12 / zoom);
                    ctx.fillText(f.properties.poiName || "", p.x, p.y + 12 / zoom);
                }
            }
        }

        // 7. Street View Coverage Lines
        if (state.toggles.streetview) {
            const svLod = getStreetviewLodFraction();
            const lonePoints = [];

            // Outer Glow Casing
            ctx.beginPath();
            for (let l = 0; l < svPolylines.length; l++) {
                const line = svPolylines[l];
                const pts = line.points;
                if (pts.length === 1) {
                    const g = pts[0]._geom;
                    if (g && isVisibleFast(g.wBounds)) lonePoints.push(g.p);
                    continue;
                }
                let started = false;
                for (let i = 0; i < pts.length; i++) {
                    const f = pts[i];
                    if (i !== 0 && i !== pts.length - 1 && f.properties.lodPriority >= svLod) continue;
                    const g = f._geom;
                    if (!g) continue;
                    const p = g.p;
                    if (!started) { ctx.moveTo(p.x, p.y); started = true; }
                    else ctx.lineTo(p.x, p.y);
                }
            }
            ctx.strokeStyle = "rgba(0, 229, 255, 0.45)";
            ctx.lineWidth = (detailLevel === 0 ? 8.5 : 6.0) / zoom;
            ctx.lineCap = "round"; ctx.lineJoin = "round";
            ctx.stroke();

            // Inner Bright Cyan Line
            ctx.strokeStyle = "#00e5ff";
            ctx.lineWidth = (detailLevel === 0 ? 4.0 : 2.8) / zoom;
            ctx.stroke();

            // Isolated Captures
            for (let i = 0; i < lonePoints.length; i++) {
                const p = lonePoints[i];
                ctx.fillStyle = "#00e5ff"; ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 1.8 / zoom;
                ctx.beginPath(); ctx.arc(p.x, p.y, 4 / zoom, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
            }
        }

        // 9. Cities & Settlements
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        for (let i = 0; i < state.layers.cities.length; i++) {
            const f = state.layers.cities[i];
            const g = f._geom;
            if (!g || !isVisibleFast(g.wBounds)) continue;
            const p = g.p;

            // City Marker: Outer White Ring + Red Center Bullseye
            ctx.fillStyle = "#ffffff"; ctx.strokeStyle = "#000000"; ctx.lineWidth = 1.5 / zoom;
            ctx.beginPath(); ctx.arc(p.x, p.y, 4.5 / zoom, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
            ctx.fillStyle = "#ef4444"; ctx.beginPath(); ctx.arc(p.x, p.y, 2.2 / zoom, 0, Math.PI * 2); ctx.fill();

            // City Label with Heavy Dark Halo
            if (zoom > 0.05) {
                ctx.save();
                ctx.font = `700 ${12 / zoom}px 'JetBrains Mono', ui-monospace, sans-serif`;
                ctx.fillStyle = "#ffffff"; ctx.strokeStyle = "rgba(0, 0, 0, 0.95)"; ctx.lineWidth = 4 / zoom;
                ctx.strokeText(f.properties.name.toUpperCase(), p.x, p.y - 12 / zoom);
                ctx.fillText(f.properties.name.toUpperCase(), p.x, p.y - 12 / zoom);
                ctx.restore();
            }
        }

        ctx.restore();
        updateScaleBar();
    }

    start();
})();
