import * as THREE from 'three';

class AudioAssistant {
    constructor(config) {
        this.isActive = false;
        this.needToInitialize = config.needToInitialize;
        this.preloadedFiles = {};
        this.parent = config.parent;
        this.currentPlayback = null;
        this.config = config.config || {};
        this.events = config.events || [];
        this.firstClickInitialized = false;
        this.audioKey = '';
        this.KEY = 's3d_audioAssistantState';
        this.SWITCH_SELECTOR = '[data-s3d-audio-guide-switch]';
        this.REPEAT_SELECTOR = '[data-s3d-audio-guide-repeat]';
        this.STOP_SELECTOR = '[data-s3d-audio-guide-disable]';
        this.ENABLE_SELECTOR = '[data-s3d-audio-guide-enable]';
        this.PLAY_MARKER_SELECTOR = '[data-s3d-audio-guide-play-marker]';
        this.STATE_MARKER_SELECTOR = '[data-s3d-audio-guide-state-marker]';
        this.SPHERE_SELECTOR = '[data-s3d2-audio-assistant]';

        this.sphere_timings = {
            on: 0.0035,
            hover: 0.002,
            off: 0.001,
        }
        this.sphereAnimation = true;
        this.sphereSpeed = this.sphere_timings.off;

        if (this.needToInitialize) {
            this.init(); 
        } else {
            this.destroy();
        }
    }
    setPlaySphereSpeed() {
        this.sphereSpeed = this.sphere_timings.on;
    }
    setStopSphereSpeed() {
        this.sphereSpeed = this.sphere_timings.off;
    }
    turnOn() {
        // Code to turn on the audio assistant
        this.isActive = true;
        this.updateUI();
        localStorage.setItem(this.KEY, true);
        console.log('turnOn', this.audioKey);
        this.setPlaySphereSpeed();
        this.play(this.audioKey);
    }
    turnOff() {
        localStorage.setItem(this.KEY, false);
        this.isActive = false;
        this.updateUI();
        if (this.currentPlayback) {
            this.currentPlayback.pause();
            this.setStopSphereSpeed();
        }
    }
    init() {
        this.startEvents();
        this.preloadFiles();
        this.initSphere();
        this.checkLocalStorage();
        this.firstClickHandler();
        this.initUIListeners();
        this.updateUI();
    }
    
    firstClickHandler() {
        document.body.addEventListener('click', () => {
            this.firstClickInitialized = true;
            this.play(this.audioKey);
        }, { once: true });
    }

    startEvents() {
        this.events.forEach(event => {
            this.parent.on(event, this.eventHandler.bind(this));
        })
    }

    eventHandler(event) {

        let audioKey = event.type;
        switch (event.type) {
            case 'flyby':
            audioKey = `flyby_${event.flyby}_${event.side}`;
            if (event.controlPoint) {
                audioKey += `_${event.controlPoint}`;
            }
            break;
            case 'genplan':
            if (event.controlPoint) {
                audioKey = `genplan_${event.controlPoint}`;
            }
            break;
        }

        if (this.audioKey === audioKey) return;
        
        this.play(audioKey);
    }

    preloadFiles() {
        const config = this.config;
        if (this.config) {
            Object.keys(config).forEach(key => {
                const audio = new Audio(config[key]);
                audio.load();
                this.preloadedFiles[key] = audio;
            });
        }
    }
    checkLocalStorage() {
        const storedState = localStorage.getItem(this.KEY);
        if (storedState === null) {
            localStorage.setItem(this.KEY, true);
            this.isActive = true;
        }
        if (storedState === 'true') {
            this.isActive = true;
        }
        if (storedState === 'false') {
            this.isActive = false;
        }
    }
    updateUI() {
        document.querySelectorAll(this.SWITCH_SELECTOR).forEach(switcher => {
            switcher.classList.toggle('active', this.isActive);
            marker.dataset.s3d_audioGuideState = this.isActive ? 'on' : 'off';
        });
        document.querySelectorAll(this.STOP_SELECTOR).forEach(marker => {
            marker.dataset.s3d_audioGuideState = this.isActive ? 'on' : 'off';
        });
        document.querySelectorAll(this.ENABLE_SELECTOR).forEach(marker => {
            marker.dataset.s3d_audioGuideState = this.isActive ? 'on' : 'off';
        });
        document.querySelectorAll(this.STATE_MARKER_SELECTOR).forEach(marker => {
            marker.classList.toggle(this.KEY + '-active', this.isActive);
            marker.classList.toggle(this.KEY + '-inactive', !this.isActive);
            marker.dataset.s3d_audioGuideState = this.isActive ? 'on' : 'off';
            this.sphereAnimation = this.isActive;
        });
        document.querySelectorAll(this.REPEAT_SELECTOR).forEach(marker => {
            marker.dataset.s3d_audioGuideState = this.isActive ? 'on' : 'off';
        });
    }  
    initUIListeners() {
        document.body.addEventListener('click', e => {
            if (e.target.closest(this.SWITCH_SELECTOR)) {
                if (this.isActive) {
                    this.turnOff();
                } else {
                    this.turnOn();
                }
            }
        });
        document.body.addEventListener('click', e => {
            if (e.target.closest(this.STOP_SELECTOR)) {
                this.turnOff();
            }
        })
        document.body.addEventListener('click', e => {
            if (e.target.closest(this.ENABLE_SELECTOR)) {
                this.turnOn();
            }
        })
        document.body.addEventListener('click', e => {
            if (e.target.closest(this.REPEAT_SELECTOR)) {
                if (this.isActive) this.play(this.audioKey);
            }
        });
    }
    play(audioKey) {
        
        if (this.currentPlayback) {
            this.currentPlayback.pause();
        }
        this.audioKey = audioKey;
        if (this.firstClickInitialized && this.isActive && this.preloadedFiles[audioKey]) {
            const audio = this.preloadedFiles[this.audioKey];
            audio.currentTime = 0;
            this.currentPlayback = audio;
            this.defineCurrentPlaybackEvents();
            this.currentPlayback.play().catch(error => {
                console.error('Error playing audio:', error);
            });
            
        }
    }
    defineCurrentPlaybackEvents() {
        this.currentPlayback.onpause = () => {
            this.stopMarkerAnimation();
        }
        this.currentPlayback.onplay = () => {
            this.startMarkerAnimation();
        }
    }
    startMarkerAnimation() {
        document.querySelectorAll(this.PLAY_MARKER_SELECTOR).forEach(marker => {
            marker.classList.add('playing');
        });
        this.setPlaySphereSpeed();
    }
    stopMarkerAnimation() {
        document.querySelectorAll(this.PLAY_MARKER_SELECTOR).forEach(marker => {
            marker.classList.remove('playing');
        });
        this.setStopSphereSpeed();
    }
    destroy() {
        document.querySelectorAll(this.PLAY_MARKER_SELECTOR).forEach(marker => {
            marker.remove();
        });
        document.querySelectorAll(this.SWITCH_SELECTOR).forEach(marker => {
            marker.remove();
        });
        document.querySelectorAll(this.REPEAT_SELECTOR).forEach(marker => {
            marker.remove();
        });
        document.querySelectorAll(this.STOP_SELECTOR).forEach(marker => {
            marker.remove();
        });
        document.querySelectorAll(this.STATE_MARKER_SELECTOR).forEach(marker => {
            marker.remove();
        });
        document.querySelectorAll(this.SPHERE_SELECTOR).forEach(marker => {
            marker.remove();
        });
        if (this.currentPlayback) {
            this.currentPlayback.pause();
            this.currentPlayback = null;
        }
        cancelAnimationFrame(this.requestAnimationFrame);
    }
    initSphere() {
        this.sphere = document.querySelector(this.SPHERE_SELECTOR);
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('webgl', { alpha: true });
        const renderer = new THREE.WebGLRenderer({ canvas, context });
        renderer.setSize(this.sphere.getBoundingClientRect().width, this.sphere.getBoundingClientRect().height);
        renderer.setClearColor(0x000000, 0); // Прозорий фон
        this.sphere.appendChild(renderer.domElement);

        renderer.domElement.setAttribute('data-s3d-audio-guide-repeat', 'true');

        if (window.screen.width > 1024) {
            renderer.domElement.addEventListener('mouseenter', () => {
                if (this.sphereSpeed == this.sphere_timings.on) return;
                this.sphereSpeed = this.sphere_timings.hover; // Set hover speed
            }, false);
            renderer.domElement.addEventListener('mouseleave', () => {
                if (this.sphereSpeed == this.sphere_timings.on) return;
                this.sphereSpeed = this.sphere_timings.off; // Reset speed on mouse leave
            })
        }


        const uniforms = {
            iTime: { value: 0 },
            iResolution: { value: new THREE.Vector3(this.sphere.getBoundingClientRect().width, this.sphere.getBoundingClientRect().height, 1) }
        };

        const fragmentShader = this.fragmentShader;

        const vertexShader = `
            void main() {
                gl_Position = vec4(position, 1.0);
            }
        `;

        // Create a plane that fills the screen
        const geometry = new THREE.PlaneGeometry(2, 2);
        const material = new THREE.ShaderMaterial({
            fragmentShader,
            vertexShader,
            uniforms,
            transparent: true, // <-- обов'язково!
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        const that = this;

        // Animation loop
        function animate(time) {
            that.requestAnimationFrame = requestAnimationFrame(animate);
            if (!that.sphereAnimation) return; // Stop animation if sphereAnimation is false
            uniforms.iTime.value = time * that.sphereSpeed; // Convert to seconds
            
            renderer.render(scene, camera);
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            renderer.setSize(this.sphere.getBoundingClientRect().width, this.sphere.getBoundingClientRect().height);
            uniforms.iResolution.value.set(this.sphere.getBoundingClientRect().width, this.sphere.getBoundingClientRect().height, 1);
        });

        animate(0);
    }

    get fragmentShader() {
        return `
            #define TAU 6.28318530718
            
            uniform float iTime;
            uniform vec3 iResolution;

            float rand(vec2 n) { 
                return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
            }

            float noise(vec2 p) {
                vec2 ip = floor(p);
                vec2 u = fract(p);
                u = u*u*(3.0-2.0*u);
                float res = mix(
                    mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
                    mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
                return res*res;    
            }

            float fbm(vec2 p, int octaves) {
                float s = 0.0;
                float m = 0.0;
                float a = 0.5;
                
                if (octaves >= 1) {
                    s += a * noise(p);
                    m += a;
                    a *= 0.5;
                    p *= 2.0;
                }
                
                if (octaves >= 2) {
                    s += a * noise(p);
                    m += a;
                    a *= 0.5;
                    p *= 2.0;
                }
                
                if (octaves >= 3) {
                    s += a * noise(p);
                    m += a;
                    a *= 0.5;
                    p *= 2.0;
                }
                
                if (octaves >= 4) {
                    s += a * noise(p);
                    m += a;
                    a *= 0.5;
                    p *= 2.0;
                }
                return s / m;
            }

            vec3 pal(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
                return a + b * cos(TAU * (c * t + d));
            }

            float luma(vec3 color) {
                return dot(color, vec3(0.299, 0.587, 0.114));
            }

            void mainImage(out vec4 fragColor, in vec2 fragCoord) {
                float min_res = min(iResolution.x, iResolution.y);
                vec2 uv = (fragCoord * 2.0 - iResolution.xy) / min_res * 1.5;
                float t = iTime;
                float l = dot(uv, uv);
                if (l > 2.5) {
                    fragColor = vec4(1.0, 0.0, 0.0, 0.0); // прозорий
                    return;
                }
                float sm = smoothstep(1.02, 0.98, l);
                float d = sm * l * l * l * 2.0;
                vec3 norm = normalize(vec3(uv.x, uv.y, .7 - d));
                float nx = fbm(uv * 2.0 + t * 0.4 + 25.69, 4);
                float ny = fbm(uv * 2.0 + t * 0.4 + 86.31, 4);
                float n = fbm(uv * 3.0 + 2.0 * vec2(nx, ny), 3);
                vec3 col = vec3(n * 0.5 + 0.25);
                float a = atan(uv.y, uv.x) / TAU + t * 0.1;
                col *= pal(a, vec3(0.3),vec3(0.5, 0.5, 0.5),vec3(1),vec3(0.0,0.8,0.8));
                col *= 2.0;  
                vec3 cd = abs(col);
                vec3 c = col * d;
                c += (c * 0.5 + vec3(1.0) - luma(c)) * vec3(max(0.0, pow(dot(norm, vec3(0, 0, -1)), 5.0) * 3.0));
                float g = 1.5 * smoothstep(0.6, 1.0, fbm(norm.xy * 3.0 / (1.0 + norm.z), 2)) * d;
                c += g;
                col = c + col * pow((1.0 - smoothstep(1.0, 0.98, l) - pow(max(0.0, length(uv) - 1.0), 0.2)) * 2.0, 4.0);
                float f = fbm(normalize(uv) * 2. + t, 2) + 0.1;
                uv *= f + 0.1;
                uv *= 0.5;
                l = dot(uv, uv);
                vec3 ins = normalize(cd) + 0.1;
                float ind = 0.2 + pow(smoothstep(0.0, 1.5, sqrt(l)) * 48.0, 0.25);
                ind *= ind * ind * ind;
                ind = 1.0 / ind;
                ins *= ind;
                col += ins * ins * sm * smoothstep(0.7, 1.0, ind);
                col += abs(norm) * (1.0 - d) * sm * 0.25;
                fragColor = vec4(col, 1.0);
            }

            void main() {
                mainImage(gl_FragColor, gl_FragCoord.xy);
            }
        `
    }
}


export default AudioAssistant;