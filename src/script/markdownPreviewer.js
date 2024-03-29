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
        this.hideBlock = this.hideBlock.bind(this)
    }

    textSaver(event){
        this.setState(()=>{
                return {
                    entered_text: event.target.value      
                }
            })
    }

    hideBlock(event){
        if(event.target.getAttribute('id') == 'editor-button') {
            //document.getElementById('editor-wrapper').classList.toggle('editor-wrapper_maxsize')
            document.getElementById('editor-textarea').classList.toggle('editor-textarea_maxsize')
            document.getElementById('preview-wrapper').classList.toggle('hide')
        }

        if(event.target.getAttribute('id') == 'previewer-button') {
            document.getElementById('editor-wrapper').classList.toggle('hide')
            document.getElementById('preview-result').classList.toggle('previewer_maxsize')
        }
    }

    render(){
        return (
            <div className="container container_style">
                <Editor 
                    textSaver={this.textSaver} 
                    hideBlock={this.hideBlock} 
                    entered_text={this.state.entered_text}/>
                <Previewer 
                    hideBlockFunc={this.hideBlock} 
                    markdown={this.state.entered_text}/>  
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
            <div  id="editor-wrapper" className="editor-wrapper editor-wrapper_style" >
                <Toolbar
                    toolbar__text="Editor">
                        <Button 
                        id = 'editor-button'
                        onClick={this.props.hideBlock}
                        button__title="Full screen"
                        button__content = '&#10530;'
                    />
                </Toolbar>
                <textarea
                    placeholder="Enter code..."
                    id="editor-textarea"
                    className="editor__textarea editor__textarea_style"
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
            <div id="preview-wrapper" className="previewer-wrapper">
                <Toolbar
                    toolbar__text="Previewer">
                    <Button 
                        id = 'previewer-button'
                        onClick={this.props.hideBlockFunc}
                        button__title="Full screen"
                        button__content = '&#10530;'
                    />
                </Toolbar> 
                <div id="preview-result" 
                     className="previewer__result previewer__result_style" 
                     dangerouslySetInnerHTML={
                        {__html: marked(this.props.markdown, {renderer: markedOpt})}
                    }>
                </div>
            </div>
        )
    }
}

class Toolbar extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="toolbar toolbar_style">
                <span className="toolbar__title toolbar__title_style">
                    {this.props.toolbar__text}
                </span>
                {this.props.children}
            </div>
        )
    }
}

class Button extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <button 
            id={this.props.id} 
            onClick={this.props.onClick} 
            className='toolbar__button toolbar__button_style'
            title={this.props.button__title}>
                {this.props.button__content}
            </button>
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