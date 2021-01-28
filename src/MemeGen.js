import React from 'react';

class MemeGen extends React.Component {
  constructor() {
    super()
    this.state = {
      topText: "",
      bottomText: "",
      rndmImg: "",
      allImgs: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const json = await response.json();
    this.setState({ allImgs: json });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

  handleSubmit(event) {
    event.preventDefault();
    const rndNum = Math.floor(Math.random() * this.state.allImgs.data.memes.length);
    const pickedImg = this.state.allImgs.data.memes[rndNum].url;
    this.setState({ rndmImg: pickedImg })
  }

  render() {
    return (
      <div>
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="topText"
            placeholder="Top Text"
            value={this.state.topText}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="bottomText"
            placeholder="Bottom Text"
            value={this.state.bottomText}
            onChange={this.handleChange}
          />

          <button>Gen</button>
        </form>
        <div>
          <img src={this.state.rndmImg} alt="" />
          <h2>{this.state.topText}</h2>
          <h2>{this.state.bottomText}</h2>
        </div>
      </div>
    )
  }
}

export default MemeGen