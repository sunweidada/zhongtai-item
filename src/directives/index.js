export const imgerror = {
  inserted(el, binding) {
    // console.log(el, binding)
    el.onerror = function() {
      el.src = binding.value
    }
  }
}
