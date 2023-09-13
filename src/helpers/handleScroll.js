// eslint-disable-next-line no-unused-vars
export const handleScrollBottomEvent = (event,doAction) => {
  const target = event.target;
  const differentSize = target.scrollHeight - target.scrollTop;
  if(differentSize === target.clientHeight || differentSize - target.clientHeight < 0) {
    doAction()
  }
}

export const checkIfBottomScrolled = (event) => {
  const target = event.target;
  const differentSize = target.scrollHeight - target.scrollTop;
  console.log(differentSize)
  console.log(target.clientHeight)
  console.log(differentSize - target.clientHeight)
  return differentSize === target.clientHeight || differentSize - target.clientHeight < 0
}
