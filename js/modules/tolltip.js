export default class initTooltip {
  constructor(tooltips) {
    this.tooltips = document.querySelectorAll(tooltips);

    // bind do objeto da classe aos callbacks
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }
  // move a tooltip com base em seus estilos
  // de acordo com a posicao do mouse
  onMouseMove(event) {
    this.tooltipBox.style.top = event.pageY + 20 + "px";
    if (event.pageX + 240 > window.innerWidth) {
      this.tooltipBox.style.left = event.pageX - 190 + "px";
    } else {
      this.tooltipBox.style.left = event.pageX + 20 + "px";
    }
  }
  // remove a tooltip e os eventos de mouseMove e mouseleave
  onMouseLeave({ currentTarget }) {
    this.tooltipBox.remove();
    currentTarget.removeEventListener("mousemove", this.onMouseMove);
    currentTarget.removeEventListener("mouseleave", this.onMouseLeave);
  }

  // Cria a tooltip box e coloca no body
  criarTolltipBox(element) {
    const tooltipBox = document.createElement("div");
    const text = element.getAttribute("aria-label");
    tooltipBox.classList.add("tooltip");
    tooltipBox.innerText = text;
    document.body.appendChild(tooltipBox);
    this.tooltipBox = tooltipBox;
  }

  // Cria a tooltip e adiciona os eventos de mouseMove e mouseLeave
  // ao target
  onMouseOver({ currentTarget }) {
    // cria a tooltip box e coloca em uma propriedade
    this.criarTolltipBox(currentTarget);

    currentTarget.addEventListener("mousemove", this.onMouseMove);
    currentTarget.addEventListener("mouseleave", this.onMouseLeave);
  }

  // Adiciona os eventos de mouseOver a cada tooltip
  addTolltipsEvent() {
    this.tooltips.forEach((item) => {
      item.addEventListener("mouseover", this.onMouseOver);
    });
  }
  init() {
    if (this.tooltips.lengh) {
      this.addTolltipsEvent();
    }
    return this;
  }
}
