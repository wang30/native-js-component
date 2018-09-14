class Sticky {
  constructor(selector, n = 0) {
    this.elements = $(selector)
    this.offset = n
    this.offsets = []

    this.addPlaceHolder()
    this.cacheOffsets()
    this.listenScroll()
  }
  addPlaceHolder() {
    this.elements.each((index, element) => {
      $(element).wrap('<div></div>')
      $(element).parent().height($(element).height())
    })
  }
  cacheOffsets() {
    this.elements.each((index, element) => {
      this.offsets.push($(element).offset())
    })
  }
  listenScroll() {
    $(window).on('scroll', () => {
      this.elements.each((index, element)=>{
        if(window.scrollY + this.offset >= this.offsets[index].top) {
          $(element).addClass('sticky').css({top: this.offset})
        }
        else {
          $(element).removeClass('sticky')
        }
      })
    })
  }
}