import React from 'react';


class Snake extends React.Component {

    constructor(props){
        super(props);

        // this.state = {
        //     matrix: [],
        //     direction: 2,
        //     posY:0,
        //     posX:0,
        // };

        this.state = {
            matrix: [],
            direction: 2,
            posY:0,
            posX:0,
        };
   
        setTimeout(() => {
            this.restart();
        }, 100);

    }


    changeSpeed(){

        if (this.intervalId){
            clearInterval(this.intervalId);
        }

        this.intervalId = setInterval(() => {
            
            this.move();

        }, 100+(200/(this.speed) ));

    }


    makeFood(){

        var matrix = this.state.matrix;

        this.foodCell  =Math.floor(Math.random()*9);

        this.food = [Math.floor(Math.random()*this.countY), Math.floor(Math.random()*this.countX)];
        matrix[this.food[0]][this.food[1]] = this.foodCell;

        this.setState({
            matrix:matrix
        });


    }


    _handleKeyDown = (event) => {
        switch( event.keyCode ) {
            case 38:
                this.setState({direction:1});
                break;
            case 39:
                this.setState({direction:2});
                break;   
            case 40:
                this.setState({direction:3});
                break;
            case 37:
                this.setState({direction:4});
                break;  
            default: 
                break;
        }
    }

    componentWillMount(){
        document.addEventListener("keydown", this._handleKeyDown.bind(this));
    }


    start(){


        var newMatrix = this.state.matrix;

        //newMatrix[Math.floor(Math.random()*this.countY)][Math.floor(Math.random()*this.countX)]='*';

        this.setState({
            matrix: newMatrix,
        })


    }


    restart(){

        var matrix =  [];

        this.message ('Начинаем игру!');

        this.moveNum = 0;

        this.lastFood = null;

        this.countY = 20;
        this.countX = 30;

        this.maxSize = 0;

        this.size = 10;

        this.empty = '·';
        //this.empty = ' ';
        this.full = '*';
        this.foodCell = '+';

        this.speed = 1;


        this.mem = [];

        for (var y=0;y<this.countY;y++){
            matrix[y] = [];
            for (var x=0;x<this.countX;x++){
                matrix[y][x] = this.empty;
            }
        }

  
        this.setState({
            matrix: matrix,
            direction: 2,
            posY:0,
            posX:0,
        });

        this.makeFood();
        this.changeSpeed();

    }


    move(){

        //console.log('direction:'+this.state.direction);

        this.moveNum++;


        var matrix = this.state.matrix;


        var posY = this.state.posY;
        var posX = this.state.posX;

        //matrix[posY][posX] = this.empty;

        

        this.mem = this.mem.slice(-this.size);

    


        if (this.mem.length>=this.size){
            var clearPos = this.mem[this.mem.length-this.size];
            //console.log('clear:',clearPos);
            matrix[clearPos[0]][clearPos[1]] = this.empty;
        }

        if (this.moveNum%10 == 0){
            this.size--;
            if (this.size<1) this.size = 1;

            var clearPos = this.mem[this.mem.length-this.size];
            console.log(clearPos);
            if (typeof clearPos != 'undefined') matrix[clearPos[0]][clearPos[1]] = this.empty;
        }


        if (this.state.direction == 1){
            posY--;
        }

        if (this.state.direction==2){
            posX++;
        }

        if (this.state.direction==3){
            posY++;
        }

        if (this.state.direction==4){
            posX--;
        }

        if (posY>this.countY-1) posY = 0;
        if (posX>this.countX-1) posX = 0;

        if (posY<0) posY = this.countY-1;
        if (posX<0) posX = this.countX-1;

        matrix[posY][posX] = this.full;

        this.mem.push([posY,posX]);
        //console.log(this.mem);

    
        for (let index = 0; index < this.mem.length-1; index++) {
            const element = this.mem[index];
            if (element[0]==posY && element[1]==posX) {
                alert('Игра окончена!');
                this.restart();
                return false;
            }
        }




        if (posY == this.food[0] && posX == this.food[1]){

            this.speed++;

            //alert(typeof this.foodCell);
            if (typeof this.foodCell == 'number') {

                

                if (this.foodCell==this.lastFood){
                    var plus = (this.foodCell*3);
                    this.size+=plus;
                    this.message ('Отлично, двойные бонусы' + plus.toString() );
                } else {
                    this.size+=this.foodCell;
                    this.message ('Отлично +' + this.foodCell.toString() );
                }
                
            } else {
                this.size++;
                this.message ('Неплохо +1');
            }


            this.lastFood=this.foodCell;

            this.makeFood();
            this.changeSpeed();
        }


        if (this.size>this.maxSize) this.maxSize = this.size;

        matrix[this.food[0]][this.food[1]] = this.foodCell;

        this.setState({
            matrix:matrix,
            posX: posX,
            posY: posY
        });


    }



    message(message){

        if (this.lastMessageId) clearInterval(this.lastMessageId);

        this.messageText= message;
        this.lastMessageId = setTimeout(() => {
            this.messageText = '-';
        }, 3000);

    }


    render(){

        var blocks = [];

        this.state.matrix.forEach((itemY, y)=>{
            //console.log(itemY);
            blocks.push(<br/>);
            itemY.forEach((itemX, x)=>{
                //console.log(itemX);
                var color = 'black'
                if (itemX != this.empty) color = 'white';
                blocks.push(
                    <span key={y+'/'+x} style={{ margin:10, color:color  }}>
                     {itemX}
                    </span>
                );
            });
        });


        return(
            <div>
                {this.messageText}
                <div>
                    Speed: <b>{this.speed}</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   Size: <b>{this.size}</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Max: <b>{this.maxSize}</b>
                </div>
                <div style={{fontFamily:'monospace'}}>
                {blocks}
                </div>
            </div>
        )
    }


}


export default Snake;