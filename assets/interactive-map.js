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
    const toggles = {
        photos: document.getElementById('toggle-photos')
    };

    // State
    const state = {
        viewX: 0,
        viewY: 0,
        zoom: 1.0,
        layers: {
            mapAreas: [],
            prefabs: [],
            roads: [],
            ferries: [],
            cities: [],
            pois: [],
            photos: [],
            roadNames: [],
            streetview: []
        },
        toggles: {
            photos: true,
            roadNames: true,
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
        background: { // New background object
            image: null,
            isLoaded: false,
            centerLon: 145.5000164922681, // User provided center longitude
            centerLat: 64.40890004210075,  // User provided center latitude
            widthInMapUnits: 40,   // Arbitrary initial width in abstract map units, needs calibration
            heightInMapUnits: 30,  // Arbitrary initial height in abstract map units, needs calibration
            isVisible: true
        }
    };

    async function start() {
        if (window.FER_DATA_LOADING) await window.FER_DATA_LOADING;

        if (!window.FER_DATA || !window.FER_DATA.features) {
            console.error('Error: window.FER_DATA (from fer-geojson.js) failed to load or is empty. Map data is critical for proper functionality.');
            setTimeout(start, 200); // Re-try loading
            return;
        }

        // Load background image
        const bgImg = new Image();
        bgImg.src = 'imgs/mapbg.png';
        bgImg.onload = () => {
            state.background.image = bgImg;
            state.background.isLoaded = true;

            // Calculate dimensions to match original image size (1:1 pixel scale at zoom 1.0)
            // This prevents stretching/squishing by respecting the map's projection calibration
            if (state.calibration.sx !== 0 && state.calibration.sy !== 0) {
                const scaleFactor = 4.4; // User requested 250% size
                state.background.widthInMapUnits = (bgImg.width / state.calibration.sx) * scaleFactor;
                state.background.heightInMapUnits = (bgImg.height / Math.abs(state.calibration.sy)) * scaleFactor;
            }

            console.log(`Background Debug: Image loaded. Dimensions set to ${state.background.widthInMapUnits.toFixed(4)} x ${state.background.heightInMapUnits.toFixed(4)} map units.`);
            requestAnimationFrame(render); // Request a re-render once image loads
        };
        bgImg.onerror = () => {
            console.error('Background Debug: Failed to load background image: imgs/mapbg.png');
            state.background.isLoaded = false;
        };

        processData(window.FER_DATA.features);
        processMarkers();
        processRoadNames();
        processStreetView();
        initializeView();
        setupToggles();
    }

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
                state.layers.streetview.push(feature);
            });
        }
    }

    function processMarkers() {
        if (window.USER_PHOTOS) {
            window.USER_PHOTOS.forEach(photo => {
                const feature = {
                    type: "Feature",
                    properties: {
                        type: "photo",
                        name: photo.name,
                        desc: photo.desc,
                        user: photo.user,
                        photo: photo.photo
                    },
                    geometry: { type: "Point", coordinates: [photo.lon, photo.lat] },
                    _bounds: { minX: photo.lon, maxX: photo.lon, minY: photo.lat, maxY: photo.lat }
                };
                state.layers.photos.push(feature);
            });
        }
    }

    const roadNameImages = {}; // Cache for road name images

    function processRoadNames() {
        if (window.ROAD_NAMES) {
            window.ROAD_NAMES.forEach(roadName => {
                const feature = {
                    type: "Feature",
                    properties: {
                        type: "roadName",
                        name: roadName.name,
                        image: roadName.image || null,
                        rotation: roadName.rotation || 0
                    },
                    geometry: { type: "Point", coordinates: [roadName.lon, roadName.lat] },
                    _bounds: { minX: roadName.lon, maxX: roadName.lon, minY: roadName.lat, maxY: roadName.lat }
                };
                state.layers.roadNames.push(feature);

                if (roadName.image && !roadNameImages[roadName.image]) {
                    const img = new Image();
                    img.src = roadName.image;
                    img.onload = () => requestAnimationFrame(render);
                    img.onerror = () => console.error(`Road Name: Failed to load image: ${roadName.image}`);
                    roadNameImages[roadName.image] = img;
                }
            });
        }
    }

    function setupToggles() {
        Object.keys(toggles).forEach(key => {
            if (!toggles[key]) return;
            toggles[key].onchange = (e) => {
                state.toggles[key] = e.target.checked;
                requestAnimationFrame(render);
            };
            state.toggles[key] = toggles[key].checked;
        });

        // Add the new road names toggle
        const roadNamesToggle = document.getElementById('toggle-road-names');
        if (roadNamesToggle) {
            roadNamesToggle.onchange = (e) => {
                state.toggles.roadNames = e.target.checked;
                requestAnimationFrame(render);
            };
            state.toggles.roadNames = roadNamesToggle.checked;
        }

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

            const widthPx = (totalMaxX - totalMinX) * state.calibration.sx;
            const heightPx = (totalMaxY - totalMinY) * Math.abs(state.calibration.sy);

            const zoomX = canvas.width / widthPx;
            const zoomY = canvas.height / heightPx;
            state.zoom = Math.min(zoomX, zoomY) * 0.8;

            state.viewX = canvas.width / 2;
            state.viewY = canvas.height / 2;
        }

        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 800);

        requestAnimationFrame(render);
    }

    // --- Interaction ---
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 62;
        requestAnimationFrame(render);
    }
    window.addEventListener('resize', resize);
    resize();

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
        requestAnimationFrame(render);
    };

    canvas.onwheel = (e) => {
        e.preventDefault();
        const factor = e.deltaY > 0 ? 0.85 : 1.15;
        const mouseX = e.clientX;
        const mouseY = e.clientY - 62;
        const worldX = (mouseX - state.viewX) / state.zoom;
        const worldY = (mouseY - state.viewY) / state.zoom;
        state.zoom *= factor;
        state.zoom = Math.max(0.01, Math.min(2000, state.zoom));
        state.viewX = mouseX - worldX * state.zoom;
        state.viewY = mouseY - worldY * state.zoom;
        requestAnimationFrame(render);
    };

    // Right Click for Coordinates
    canvas.oncontextmenu = (e) => {
        e.preventDefault();
        const mouseX = e.clientX;
        const mouseY = e.clientY - 62;

        // Convert screen pixel to map Lon/Lat
        const worldX = (mouseX - state.viewX) / state.zoom;
        const worldY = (mouseY - state.viewY) / state.zoom;

        const coords = getCoordsFromPixel(worldX, worldY);

        ctxMenu.style.left = mouseX + 'px';
        ctxMenu.style.top = mouseY + 'px';
        ctxMenu.style.display = 'block';

        coordsDisplay.innerHTML = `Lon: ${coords.lon.toFixed(5)}<br>Lat: ${coords.lat.toFixed(5)}`;
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

        // Invert Translation
        return {
            lon: tx - c.ox,
            lat: ty - c.oy
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
        const mouseX = e.clientX;
        const mouseY = e.clientY - 62;
        ctxMenu.style.display = 'none';

        state.layers.photos.forEach(f => {
            const p = transform(f.geometry.coordinates[0], f.geometry.coordinates[1]);
            const sx = p.x * state.zoom + state.viewX;
            const sy = p.y * state.zoom + state.viewY;
            const dist = Math.sqrt((mouseX - sx) ** 2 + (mouseY - sy) ** 2);
            if (dist < 15 && state.toggles.photos) {
                // Open Photo Modal
                const modal = document.getElementById('photo-modal');
                const img = document.getElementById('modal-img');
                const title = document.getElementById('modal-title');
                const desc = document.getElementById('modal-desc');
                const user = document.getElementById('modal-user');

                img.src = f.properties.photo;
                title.innerText = f.properties.name.toUpperCase();
                desc.innerText = f.properties.desc;
                user.innerText = `BY ${f.properties.user.toUpperCase()}`;

                modal.style.display = 'flex';
                return; // Prevent streetview modal from opening
            }
        });

        if (state.toggles.streetview) {
            state.layers.streetview.forEach((f, index) => {
                const p = transform(f.geometry.coordinates[0], f.geometry.coordinates[1]);
                const sx = p.x * state.zoom + state.viewX;
                const sy = p.y * state.zoom + state.viewY;
                const dist = Math.sqrt((mouseX - sx) ** 2 + (mouseY - sy) ** 2);
                if (dist < 15) {
                    openStreetViewModal(index);
                    return; // Prevent further clicks
                }
            });
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
            modalStreetViewImg.src = `imgs/streetview/${currentSV.properties.file}`;
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

    function render() {
        ctx.fillStyle = "#080808"; ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.save(); ctx.translate(state.viewX, state.viewY); ctx.scale(state.zoom, state.zoom);
        const zoom = state.zoom;
        const detailLevel = zoom > 1.5 ? 2 : (zoom > 0.5 ? 1 : 0);

        // 0. Background Image
        if (state.toggles.background && state.background.isLoaded && state.background.image) {
            const bg = state.background;
            const p = transform(bg.centerLon, bg.centerLat);
            // Calculate dimensions in world pixels
            const width = bg.widthInMapUnits * state.calibration.sx;
            // Use absolute value for height scaling as sy is negative
            const height = bg.heightInMapUnits * Math.abs(state.calibration.sy);

            ctx.drawImage(
                bg.image,
                p.x - width / 2,
                p.y - height / 2,
                width,
                height
            );
        }

        // 1. Map Areas
        const areaColors = { 0: "#1a1a1a", 1: "#1e272e", 2: "#2d3436", 3: "#000000", 4: "#218c74" };
        state.layers.mapAreas.sort((a, b) => (a.properties.zIndex || 0) - (b.properties.zIndex || 0));
        state.layers.mapAreas.forEach(f => {
            if (!isVisible(f._bounds)) return;
            ctx.fillStyle = areaColors[f.properties.color] || areaColors[0];
            ctx.strokeStyle = "#222"; ctx.lineWidth = 0.5 / zoom;
            ctx.beginPath(); drawGeometry(f.geometry); ctx.fill(); ctx.stroke();
        });

        // 2. Prefabs
        const prefabColors = { 0: "#2c3e50", 1: "#34495e", 2: "#57606f", 3: "#a4b0be", 4: "#e67e22" };
        state.layers.prefabs.sort((a, b) => (a.properties.zIndex || 0) - (b.properties.zIndex || 0));
        state.layers.prefabs.forEach(f => {
            if (!isVisible(f._bounds)) return;
            const isHouse = f.properties.color === 2 || f.properties.color === 3;
            ctx.fillStyle = prefabColors[f.properties.color] || prefabColors[1];
            ctx.strokeStyle = isHouse ? "#2f3542" : "#333"; ctx.lineWidth = (isHouse ? 1.2 : 0.8) / zoom;
            ctx.beginPath(); drawGeometry(f.geometry); ctx.fill(); ctx.stroke();
            if (isHouse && zoom > 0.5) { ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.lineWidth = 0.5 / zoom; ctx.stroke(); }
        });

        // 3. Roads
        const drawRoadBatch = (isSecret, color, width) => {
            ctx.beginPath();
            state.layers.roads.forEach(f => {
                if (f.properties.secret !== isSecret) return;
                if (detailLevel === 0 && f.properties.roadType === 'local') return;
                if (!isVisible(f._bounds)) return;
                drawGeometry(f.geometry);
            });
            ctx.strokeStyle = color; ctx.lineWidth = width / zoom; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.stroke();
        };
        drawRoadBatch(false, "#e1b12c", detailLevel === 0 ? 3 : 1.5);
        drawRoadBatch(true, "#ffffff", detailLevel === 0 ? 4 : 2);

        // 4. Ferries
        ctx.beginPath();
        state.layers.ferries.forEach(f => { if (!isVisible(f._bounds)) return; drawGeometry(f.geometry); });
        ctx.strokeStyle = "#4aa3df"; ctx.lineWidth = (detailLevel === 0 ? 4 : 2) / zoom;
        ctx.setLineDash([8 / zoom, 4 / zoom]); ctx.stroke(); ctx.setLineDash([]);

        // 5. POIs (Ferry Ports)
        state.layers.pois.forEach(f => {
            if (!isVisible(f._bounds)) return;
            const p = transform(f.geometry.coordinates[0], f.geometry.coordinates[1]);
            if (f.properties.poiType === 'ferry') {
                const size = 7 / zoom; ctx.fillStyle = "#3498db"; ctx.strokeStyle = "#2980b9"; ctx.lineWidth = 2 / zoom;
                ctx.beginPath(); ctx.arc(p.x, p.y, size / 2, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
                if (zoom > 0.5) { ctx.font = `italic bold ${10 / zoom}px sans-serif`; ctx.fillStyle = "#3498db"; ctx.fillText("FERRY: " + (f.properties.poiName || ""), p.x, p.y + 12 / zoom); }
            }
        });

        // 6. User Photos
        if (state.toggles.photos) {
            state.layers.photos.forEach(f => {
                if (!isVisible(f._bounds)) return;
                const p = transform(f.geometry.coordinates[0], f.geometry.coordinates[1]);
                const size = 8 / zoom;
                ctx.fillStyle = "#27ae60"; ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.5 / zoom;
                ctx.beginPath(); ctx.moveTo(p.x - size / 2, p.y - size / 2); ctx.lineTo(p.x + size / 2, p.y - size / 2); ctx.lineTo(p.x + size / 2, p.y + size / 2); ctx.lineTo(p.x - size / 2, p.y + size / 2); ctx.closePath(); ctx.fill(); ctx.stroke();
                if (zoom > 1.0) { ctx.font = `bold ${9 / zoom}px sans-serif`; ctx.fillStyle = "#2ecc71"; ctx.fillText(f.properties.name, p.x, p.y + 12 / zoom); }
            });
        }

        // 7. Street View Markers
        if (state.toggles.streetview) {
            state.layers.streetview.forEach(f => {
                if (!isVisible(f._bounds)) return;
                const p = transform(f.geometry.coordinates[0], f.geometry.coordinates[1]);
                const size = 8 / zoom;
                ctx.fillStyle = "#FFD700"; // Gold color for streetview markers
                ctx.strokeStyle = "#fff";
                ctx.lineWidth = 1.5 / zoom;
                ctx.beginPath(); ctx.arc(p.x, p.y, size / 2, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
                if (zoom > 1.0) { ctx.font = `bold ${9 / zoom}px sans-serif`; ctx.fillStyle = "#FFD700"; ctx.fillText("SV: " + f.properties.id, p.x, p.y + 12 / zoom); }
            });
        }

        // 8. Road Names
        if (state.toggles.roadNames) {
            state.layers.roadNames.forEach(f => {
                if (!isVisible(f._bounds)) return;
                const p = transform(f.geometry.coordinates[0], f.geometry.coordinates[1]);

                ctx.save();
                ctx.translate(p.x, p.y);
                if (f.properties.rotation) {
                    ctx.rotate(f.properties.rotation * Math.PI / 180);
                }

                if (f.properties.image && roadNameImages[f.properties.image] && roadNameImages[f.properties.image].complete) {
                    const img = roadNameImages[f.properties.image];
                    const imgWidth = img.width / (zoom * 2); // Default image size
                    const imgHeight = img.height / (zoom * 2); // Default image size
                    ctx.drawImage(img, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
                } else if (f.properties.name) {
                    ctx.font = `bold ${12 / zoom}px sans-serif`; // Default font size
                    ctx.fillStyle = "#fff";
                    ctx.strokeStyle = "#000";
                    ctx.lineWidth = 2 / zoom;
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.strokeText(f.properties.name, 0, 0);
                    ctx.fillText(f.properties.name, 0, 0);
                }
                ctx.restore();
            });
        }

        // 9. Cities
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        state.layers.cities.forEach(f => {
            if (!isVisible(f._bounds)) return;
            const p = transform(f.geometry.coordinates[0], f.geometry.coordinates[1]);
            ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(p.x, p.y, 4 / zoom, 0, Math.PI * 2); ctx.fill();
            if (zoom > 0.05) {
                ctx.save(); ctx.font = `bold ${13 / zoom}px sans-serif`; ctx.fillStyle = "#fff"; ctx.strokeStyle = "#000"; ctx.lineWidth = 4 / zoom;
                ctx.strokeText(f.properties.name.toUpperCase(), p.x, p.y - 12 / zoom); ctx.fillText(f.properties.name.toUpperCase(), p.x, p.y - 12 / zoom); ctx.restore();
            }
        });

        ctx.restore();
    }

    function drawGeometry(geom) {
        if (geom.type === 'Point') return;
        const coords = geom.coordinates;
        if (geom.type === 'LineString') drawLine(coords);
        else if (geom.type === 'Polygon') coords.forEach(ring => drawLine(ring, true));
        else if (geom.type === 'MultiPolygon') coords.forEach(poly => poly.forEach(ring => drawLine(ring, true)));
    }

    function drawLine(points, closed = false) {
        if (points.length < 2) return;
        const p0 = transform(points[0][0], points[0][1]); ctx.moveTo(p0.x, p0.y);
        for (let i = 1; i < points.length; i++) { const p = transform(points[i][0], points[i][1]); ctx.lineTo(p.x, p.y); }
        if (closed) ctx.closePath();
    }

    start();
})();
