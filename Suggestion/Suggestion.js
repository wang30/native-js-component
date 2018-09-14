class Suggestion {
  constructor(options) {
    this.options = options
    this.$input = $(options.input)

    this.init()
    this.bindEvents()
  }
  init() {
    this.$input.wrap('<div class="my-suggestion"></div>')
    this.$wrapper = this.$input.parent()

    this.$ol = $('<ol></ol>')
    this.$input.after(this.$ol)

    this.$loading = $('<div class="my-suggestion-loading"></div>')
    this.$loading.html(this.options.loadingTemplate)
    this.$ol.after(this.$loading)

    this.$empty = $('<div class="my-suggestion-empty"></div>')
    this.$empty.html(this.options.emptyTemplate)
    this.$ol.after(this.$empty)

    this.$ol.on('click', 'li', (e)=>{
      this.$input.val($(e.currentTarget).text())
    })
  }
  bindEvents() {
    let timeId
    this.$input.on('input', (e) => {
      if(timeId){
        clearTimeout(timeId)
      }
      timeId = setTimeout(() => {
        this.search(e.currentTarget.value)
      }, 1000)
    })
  }
  search(value) {
    this.$wrapper.removeClass('empty')
    this.$ol.empty()
    if(value) {
      this.$wrapper.addClass('loading')
      this.options.search(value, (array) => {
        this.$wrapper.removeClass('loading')
        this.$ol.empty()

        if(array.length === 0)
          this.$wrapper.addClass('empty')
        else
          array.forEach(text => {
            this.$ol.append($('<li></li>').text(text))
          })
      })
    }
  }
}