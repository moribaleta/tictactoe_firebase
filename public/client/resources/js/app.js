const app = new Vue({
    el: "#app",
    data: {
        table   : [],
        table_size: {
          row: 3,
          col: 3
        },

        player  : 1,
        winner  : null
    },
    methods: {
        
        onStart() {
            this.table = []

            for(var i = 0;i<this.table_size.row;i++){
              var row = []
              for(var j = 0;j<this.table_size.col;j++){
                row.push(0)
              }
             this.table.push(row)
            }
            
            this.winner = null
            this.player = 1
        },//onStart

        onFinish(){
            alert("Winner: player "+ this.winner)
        },//onFinish

        onSelect(row, col){

            if(this.winner) {
                return
            }

            if (this.table[row][col] > 0) {
                alert("Item already selected")
                return 
            }

            var table = this.table
            table[row][col] = this.player

            this.table = [...table]

            let result = this.checker()

            if (this.player == 1) {
                this.player = 2
            } else {
                this.player = 1
            }

            if (result > 0) {
                this.winner = result
                this.onFinish()
            } 
        },//onSelect

        checker() {
            const checker_value = this.player // 1, 2
            const check_1       = 3//1 * this.table_size.col
            const check_2       = 6//2 * this.table_size.col
            
            const table = this.table
    
            for (var i = 0; i < table.length; i++) {
    
                console.log(" checking row " + i)
                var sum = 0
    
                ///for each column value
                for (var j = 0; j < table[i].length; j++) {
                    console.log(" checking column " + j)
                    if (table[i][j] == checker_value) {
                        sum += table[i][j]
                    }
                }
    
                console.log("sum = " + sum)
    
                if (check_1 == sum) {
                    console.log(" winner check1 ")
                    return 1
                } else if (check_2 == sum) {
                    console.log(" winner check2 ")
                    return 2
                }
            }
    
            var sum = 0

            //diagonal left - right
            for (var i = 0; i < table.length; i++) {
                let value = table[i][i]
                if (value == checker_value) {
                    sum += value
                }
            }
    
            if (check_1 == sum) {
                console.log(" winner check1 ")
                return 1
            } else if (check_2 == sum) {
                console.log(" winner check2 ")
                return 2
            }
    
            sum = 0
    
            //diagnonal right to left
            for (var i = 0, j = table.length - 1; i < table.length, j >= 0; i++, j--) {

                let value = table[i][j]
                console.log("diagonals: i:"+i+", j:"+j +" value="+value)
                
                if (value == checker_value) {
                    sum += value
                }
            }
    
            if (check_1 == sum) {
                console.log(" winner check1 ")
                return 1
            } else if (check_2 == sum) {
                console.log(" winner check2 ")
                return 2
            }

          // i: 0, 1, 2 - 2, 1, 0
          // j: 2, 1, 0 - 0, 1, 2

          // [1,0,0] -> 0,2 table[0][2] = 0
          // [0,2,0] -> 1,1 table[1][1] = 2
          // [1,0,0] -> 2,0 table[2][0] = 1

          // loop: 0, 1, 2
          // [1,0,0] -> 0,0 table[0][0] = 1
          // [0,2,0] -> 1,1 table[1][1] = 2
          // [1,0,0] -> 2,2 table[2][2] = 0

          // loop: 0, 1, 2
          // [1,0,0] -> 0,0 table[0][0] = 1
          // [0,2,0] -> 0,1 table[0][1] = 0
          // [1,0,0] -> 0,2 table[0][2] = 0

         
           ///CARLOS code------
         for(var i = 0;i<table[0].length;i++){ // <-- i for column
          sum = 0
           for(var j = 0;j<table.length;j++){ // <-- j for row
             let value = table[j][i] //<--- value is either 0, 1, 2
             if(checker_value == value){
               sum += value
             }
           }

          if (check_1 == sum) {
              console.log(" winner check1 ")
              return 1
          } else if (check_2 == sum) {
              console.log(" winner check2 ")
              return 2
          }
           
         }
          
          ///----------------



          return 0

        },//checker
          
    }

})//app