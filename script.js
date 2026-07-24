const stickerElements = document.querySelectorAll("[data-sticker]");

const clamp = (value, minimum, maximum) =>
  Math.min(Math.max(value, minimum), maximum);

for (const sticker of stickerElements) {
  // Drag vars live on the slot so siblings (the speech bubble) follow along.
  const scope = sticker.closest(".sticker-slot") ?? sticker;
  let pointerState = null;
  let suppressNextClick = false;
  const position = { x: 0, y: 0 };

  const applyPosition = () => {
    scope.style.setProperty("--drag-x", `${position.x.toFixed(1)}px`);
    scope.style.setProperty("--drag-y", `${position.y.toFixed(1)}px`);
  };

  const finishPointer = (event) => {
    if (!pointerState || event.pointerId !== pointerState.pointerId) return;

    if (sticker.hasPointerCapture(event.pointerId)) {
      sticker.releasePointerCapture(event.pointerId);
    }

    if (pointerState.moved) {
      suppressNextClick = true;
      window.setTimeout(() => {
        suppressNextClick = false;
      }, 250);
    }

    delete sticker.dataset.dragging;
    pointerState = null;
  };

  // Links native-drag by default, which swallows the pointer gesture.
  sticker.addEventListener("dragstart", (event) => {
    event.preventDefault();
  });

  sticker.addEventListener("pointerdown", (event) => {
    if (pointerState || event.button !== 0) return;

    const bounds = sticker.getBoundingClientRect();
    pointerState = {
      pointerId: event.pointerId,
      clientX: event.clientX,
      clientY: event.clientY,
      startX: position.x,
      startY: position.y,
      baseLeft: bounds.left - position.x,
      baseTop: bounds.top - position.y,
      width: bounds.width,
      height: bounds.height,
      moved: false,
    };

    sticker.setPointerCapture(event.pointerId);
  });

  sticker.addEventListener("pointermove", (event) => {
    if (!pointerState || event.pointerId !== pointerState.pointerId) return;

    const deltaX = event.clientX - pointerState.clientX;
    const deltaY = event.clientY - pointerState.clientY;

    if (!pointerState.moved && Math.hypot(deltaX, deltaY) > 3) {
      pointerState.moved = true;
      sticker.dataset.dragging = "true";
    }

    if (!pointerState.moved) return;
    event.preventDefault();

    position.x = clamp(
      pointerState.startX + deltaX,
      12 - pointerState.baseLeft,
      window.innerWidth - 12 - pointerState.width - pointerState.baseLeft,
    );
    position.y = clamp(
      pointerState.startY + deltaY,
      12 - pointerState.baseTop,
      window.innerHeight - 12 - pointerState.height - pointerState.baseTop,
    );
    applyPosition();
  });

  sticker.addEventListener("pointerup", finishPointer);
  sticker.addEventListener("pointercancel", finishPointer);

  sticker.addEventListener("click", (event) => {
    if (!suppressNextClick) return;
    event.preventDefault();
    suppressNextClick = false;
  });

  sticker.addEventListener("keydown", (event) => {
    const amount = event.shiftKey ? 24 : 10;
    const movement = {
      ArrowLeft: [-amount, 0],
      ArrowRight: [amount, 0],
      ArrowUp: [0, -amount],
      ArrowDown: [0, amount],
    }[event.key];

    if (movement) {
      event.preventDefault();
      const bounds = sticker.getBoundingClientRect();
      const deltaX = clamp(
        movement[0],
        12 - bounds.left,
        window.innerWidth - 12 - bounds.right,
      );
      const deltaY = clamp(
        movement[1],
        12 - bounds.top,
        window.innerHeight - 12 - bounds.bottom,
      );
      position.x += deltaX;
      position.y += deltaY;
      applyPosition();
      return;
    }

    if (event.key === "Escape") {
      position.x = 0;
      position.y = 0;
      applyPosition();
      sticker.blur();
    }
  });

  window.addEventListener(
    "resize",
    () => {
      // A resize invalidates the cached drag bounds — abort any active drag.
      if (pointerState) {
        if (sticker.hasPointerCapture(pointerState.pointerId)) {
          sticker.releasePointerCapture(pointerState.pointerId);
        }
        delete sticker.dataset.dragging;
        pointerState = null;
      }
      position.x = 0;
      position.y = 0;
      applyPosition();
    },
    { passive: true },
  );
}

// Cool Guy pops a comic bubble when clicked (a drag is not a click).
const bubbleToggle = document.querySelector("[data-bubble-toggle]");
const bubble = document.querySelector("[data-bubble]");
let bubbleTimer = 0;

if (bubbleToggle && bubble) {
  bubbleToggle.addEventListener("click", (event) => {
    if (event.defaultPrevented) return;

    const open = bubble.dataset.open !== "true";
    bubble.dataset.open = String(open);
    window.clearTimeout(bubbleTimer);
    if (open) {
      bubbleTimer = window.setTimeout(() => {
        bubble.dataset.open = "false";
      }, 2600);
    }
  });
}
