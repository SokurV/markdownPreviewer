import { marked } from "marked";
import React from "react";

marked.setOptions({
    breaks: true,
    highlight: function (code) {
      return Prism.highlight(code, Prism.languages.javascript, 'javascript');
    }
  })

export default class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            entered_text: startText

        }
        this.textSaver = this.textSaver.bind(this)
    }

    textSaver(event){
        this.setState(()=>{
                return {
                    entered_text: event.target.value      
                }
            })
    }

    render(){
        return (
            <div className="appWrapper">
                <Editor textSaver={this.textSaver} entered_text={this.state.entered_text}/>
                <Previewer markdown={this.state.entered_text}/>  
            </div>
        )
    }
}


class Editor extends React.Component {
    constructor(props){
        super(props)
    }

    render(){

        return (
            <div  className="editor-wrapper" >
                <div className="toolbar">
                    <span className="windowName">Editor</span>
                </div>
                <textarea
                    placeholder="Enter code..."
                    id="editor"
                    className="editor"
                    onChange={this.props.textSaver} 
                    value={this.props.entered_text}>
                </textarea>
            </div>
        )
    }

}

class Previewer extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        const markedOpt = new marked.Renderer();
        markedOpt.link = function (href, title, text) {
            return `<a target="_blank" href="${href}">${text}</a>`
        }
        markedOpt.heading = function (text, level) {
            return level <= 2?
                `<h${level}>${text}</h${level}><hr>`
                :`<h${level}>${text}</h${level}>`
        }

        return (
            <div className="previewer-wrapper">
                <div className="toolbar">
                    <span className="windowName">Previewer</span>
                </div>
                <div id="preview" className="previewer" dangerouslySetInnerHTML={
                    {__html: marked(this.props.markdown, {renderer: markedOpt})}
                }></div>
            </div>
        )
    }
}

const startText = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`