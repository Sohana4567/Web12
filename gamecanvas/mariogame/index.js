const canvas=document.querySelector("canvas")
const c=canvas.getContext('2d')
canvas.width=innerWidth
canvas.height=innerHeight
const gravity=.5
class  Player {
  constructor(){
      this.position={
          x:100,
          y:100
      }
      this.velocity={
        x:0,
        y:1
    }
      this.width=30
      this.height=30
  }    
  draw(){
      c.fillStyle='red'
      c.fillRect(this.position.x,this.position.y,this.width,this.height)
  }

  update(){
    this.position.x+=this.velocity.x
      this.position.y+=this.velocity.y
      if(this.position.y+this.height+this.velocity.y<=canvas.height){
        this.velocity.y+=gravity
      }else{
        this.velocity.y=0
      }  
     
      this.draw()
    }

}
class Platform {
    constructor(){
        this.position={
            x:200,
            y:100
        } 
        this.width=200
        this.height=20
    }      
   draw(){
    c.fillRect(this.position.x,this.position.y,this.width,this.height)
   }  

}

const  player=new Player()
const  platform=new Platform()

function animate(){
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
    requestAnimationFrame(animate)
    player.update()
    platform.draw()
    if(player.position.y+player.height+player.velocity.y<=platform.position.y){
        player.position.x=0
    } 

}   
animate()

addEventListener('keydown', ({ keyCode }) =>{
    switch(keyCode){
       case 65:
         console.log('left')
         player.velocity.x-=1
         break
       case 83:
         console.log('down')
         break
       case 68:
         console.log('right')
         player.velocity.x+=1
         break
       case 87:
         console.log('up')
         player.velocity.y-=15
         break
         
    
    }
})