var canvas=document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var c=canvas.getContext('2d');

class Circle{
    constructor(position){
        this.position=position;
        this.velocity={
            dx:4,
            dy:4
        }
        this.radius=30
    }
    draw(){
        c.beginPath();
        c.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2,false)
        c.strokeStyle='blue';
        c.stroke();
    }
    update(){
        this.draw();
        if(this.position.x+this.radius>innerWidth || this.position.x-this.radius<0){
            this.velocity.dx=-this.velocity.dx;
        }
        if(this.position.y+this.radius>innerHeight || this.position.y-this.radius<0){
            this.velocity.dy=-this.velocity.dy;
        }
        this.position.x+=this.velocity.dx;
        this.position.y+=this.velocity.dy;
       
    }
}


let circleArray=[];
for(let i=0;i<=100;i++){
    circleArray.push(new Circle({x:Math.random()*innerWidth,y:Math.random()*innerHeight}))
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    for(let i=0;i<circleArray.length;i++){
        circleArray[i].update();
    }
}
animate();