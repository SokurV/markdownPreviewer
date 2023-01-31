import React from 'react'
import ReactDOM from 'react-dom/client'
import '../sass/index.sass'
import App from './markdownPreviewer'


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)

window.addEventListener('resize', function(){
    if(document.documentElement.clientWidth < 510){
        alert('Ширина экрана меньше 510px.\nЭлементы <code> и <table> не отображены')
    }
})