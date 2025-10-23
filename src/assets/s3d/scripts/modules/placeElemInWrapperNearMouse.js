function placeElemInWrapperNearMouse(el, wrap, event, offset = 10) {
  const mousePosition = {
    x: event.pageX + offset,
    y: event.pageY,
  };

  const wrapperSize = { height: wrap.offsetHeight, width: wrap.offsetWidth };
  const elementSize = { height: el.offsetHeight, width: el.offsetWidth };

  const distanceToTop = mousePosition.y;

  const x = mousePosition.x;
  let y = mousePosition.y;

  if (distanceToTop < 300) {
    y = mousePosition.y + elementSize.height / 2;
  }

  if (y + elementSize.height > wrapperSize.height) {
    y = wrapperSize.height - elementSize.height;
  }

  return { x, y };
}

export default placeElemInWrapperNearMouse;
