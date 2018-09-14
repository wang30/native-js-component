class Slides {
  constructor(options) {
    this.options = Object.assign({
      autoplay: true,
      controls: true,
    }, options)
    this.$element = $(this.options.element)
    this.$element.addClass('my-slides')
    this.timer = undefined
    this.current = 0

    this.initHtml()
    this.bindEvents()

    if(this.options.autoplay) {
      this.play()
    }
  }
  initHtml() {
    this.width = this.$element.children('ol').children('li').width()
    this.$element.width(this.width)

    if(this.options.controls){
      this.$prev = $('<button class=prev>上一张</button>')
      this.$element.append(this.$prev)
      this.$next = $('<button class=next>下一张</button>')
      this.$element.append(this.$next)
    }
  }
  bindEvents() {
    this.$prev.on('click', _=>this.prev())
    this.$next.on('click', _=>this.next())
    if(this.options.autoplay) {
      this.$element.on('mouseenter', _=>{
        this.stop()
      }).on('mouseleave', _=>{
        this.play()
      })
    }
  }
  play() {
    this.timer = setInterval(() => {
      this.next()
    }, 2000)
  }
  next() {
    this.go(this.current + 1)
  }
  prev() {
    this.go(this.current - 1)
  }
  go(index) {
    let $ol = this.$element.children('ol')
    let length = $ol.children('li').length

    if(index >= length)
      index = 0
    else if(index < 0)
      index = length - 1

    $ol.css({transform: `translateX(${-index*this.width}px)`})
    this.current = index
  }
  stop() {
    clearInterval(this.timer)
  }
}