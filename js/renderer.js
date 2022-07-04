document.addEventListener('keydown', (event)=>{
  let name = event.key
  let code = event.code
  let title = document.querySelector('.title').textContent
  if (name === "Control") return 
  if (event.ctrlKey && (event.key=="s" || event.key=="S")){
    console.log('saving')
    window.electronApi.saveFile(document.getElementById('text-el').value).then(
      res => {
        console.log(res)
        console.log("Current title: "+title)
        document.querySelector('.title').textContent = res || title
      }    
    )
  }

  if (event.ctrlKey && (event.key =="o" ||event.key =="O")){
    console.log('Opening File')
    window.electronApi.openFile().then(
      res => {
        console.log(res)
        console.log("title is : "+title)
        const {name, data } = res
        // name.split('.')[0]
        document.getElementById('text-el').textContent = data
        document.querySelector('.title').textContent = name || title

      }
    )
  }

  if (event.ctrlKey && event.key =="+"){
    console.log('Increassing Font')
    let size = parseInt(document.getElementById('text-el').style.fontSize)
    document.getElementById('text-el').style = `font-size: ${size<6?++size:size}em; height:100%; width:100%`
  }

  if (event.ctrlKey && event.key =="-"){
    console.log('Decreasing Font')
    let size = parseInt(document.getElementById('text-el').style.fontSize)
    document.getElementById('text-el').style = `font-size: ${size>2?--size:size}em; height:100%; width:100%`

  }


}, false)

document.addEventListener('DOMContentLoaded', ()=>{

})







// var remote = require('remote')
// var Menu = remote.require('menu')
// var MenuItem = remote.require('menu-item')

// // Build our new menu
// var menu = new Menu()
// menu.append(new MenuItem({
//   label: 'Delete',
//   click: function() {
//     // Trigger an alert when menu item is clicked
//     alert('Deleted')
//   }
// }))
// menu.append(new MenuItem({
//   label: 'More Info...',
//   click: function() {
//     // Trigger an alert when menu item is clicked
//     alert('Here is more information')
//   }
// }))

// // Add the listener
// document.addEventListener('DOMContentLoaded', function () {
//   document.querySelector('.js-context-menu').addEventListener('click', function (event) {
//     menu.popup(remote.getCurrentWindow());
//   })
// })
