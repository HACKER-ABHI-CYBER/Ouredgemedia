/**
 * Our Edge Media - Ultra-Smooth Agency Custom Cursor
 * 60-144 FPS Hardware-Accelerated Physics
 */

(function initAgencyCursor() {
    // Only initialize on desktop devices that have fine pointer/hover
    if (window.matchMedia && window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
        return;
    }

    // Auto-create cursor elements in DOM
    let dot = document.getElementById("cursorDot");
    let ring = document.getElementById("cursorRing");

    if (!dot) {
        dot = document.createElement("div");
        dot.id = "cursorDot";
        dot.className = "custom-cursor-dot";
        document.body.appendChild(dot);
    }

    if (!ring) {
        ring = document.createElement("div");
        ring.id = "cursorRing";
        ring.className = "custom-cursor-ring";
        document.body.appendChild(ring);
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let isClicking = false;
    let isHovering = false;

    // Linear interpolation for smooth trailing
    const lerp = (start, end, factor) => start + (end - start) * factor;

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!isVisible) {
            isVisible = true;
            dot.classList.add("visible");
            ring.classList.add("visible");
            ringX = mouseX;
            ringY = mouseY;
        }

        // Dot follows cursor 1:1 instantly
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) ${isClicking ? 'scale(1.4)' : isHovering ? 'scale(0.8)' : 'scale(1)'}`;
    }, { passive: true });

    document.addEventListener("mouseleave", () => {
        isVisible = false;
        dot.classList.remove("visible");
        ring.classList.remove("visible");
    });

    document.addEventListener("mouseenter", () => {
        isVisible = true;
        dot.classList.add("visible");
        ring.classList.add("visible");
    });

    window.addEventListener("mousedown", (e) => {
        if (e.button !== 0) return;
        isClicking = true;
        ring.classList.add("clicking");
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(1.4)`;
    });

    window.addEventListener("mouseup", () => {
        isClicking = false;
        ring.classList.remove("clicking");
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) ${isHovering ? 'scale(0.8)' : 'scale(1)'}`;
    });

    // Detect hoverable interactive targets dynamically
    const interactiveSelectors = 'a, button, input, textarea, select, label, .btn, .read-btn, .gallery-btn, .footer-social-btn, .social-icon, .card, .menu-btn, .chat-open, [role="button"], [onclick]';

    document.addEventListener("mouseover", (e) => {
        if (e.target.closest(interactiveSelectors)) {
            isHovering = true;
            ring.classList.add("hover");
            dot.classList.add("hover");
        }
    });

    document.addEventListener("mouseout", (e) => {
        if (e.target.closest(interactiveSelectors)) {
            isHovering = false;
            ring.classList.remove("hover");
            dot.classList.remove("hover");
        }
    });

    // 60-144 FPS physics loop for fluid magnetic ring follower
    function render() {
        if (isVisible) {
            ringX = lerp(ringX, mouseX, 0.18);
            ringY = lerp(ringY, mouseY, 0.18);
            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) ${isClicking ? 'scale(0.75)' : isHovering ? 'scale(1.55)' : 'scale(1)'}`;
        }
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
})();

