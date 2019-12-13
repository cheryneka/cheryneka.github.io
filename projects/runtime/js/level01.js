var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1,
            speed: -3,
            gameItems: [
                {type: 'sawblade',x:400,y:groundY-563},
                {type: 'sawblade',x:600,y:groundY-300},
                {type: 'sawblade',x:900,y:groundY-250},
                {type: 'sawblade',x:200,y:groundY-398},
                {type: 'street-light',x:250,y:groundY-196},
                {type: 'street-light',x:500,y:groundY-200},
                {type: 'street-light',x:800,y:groundY-400},
                {type: 'street-light',x:750,y:groundY-360},
                {type: 'enemy',x:280,y:groundY-310},
                {type: 'enemy',x:400,y:groundY-320},
                {type: 'enemy',x:600,y:groundY-310},
            ]
        };
        window.levelData = levelData;

        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade(x,y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 20;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);

            var obstacleImage = draw.bitmap('img/sawblade.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }
        
        function createEnemy() {
                var enemy =  game.createGameItem('enemy',25);
                var redSquare = draw.rect(50,50,'red');
                redSquare.x = -25;
                redSquare.y = -25;
                enemy.addChild(redSquare);
                enemy.x = 400;
                enemy.y = groundY-50;
                game.addGameItem(enemy);
                enemy.velocityX = -3;
                enemy.rotationalVelocity = 10;
                enemy.onPlayerCollision = function() {
                    game.changeIntegrity(5);
                    enemy.fadeOut();
                };
                enemy.onProjectileCollision = function() {
                    game.increaseScore(50);
                };
            }

        for (var i = 0; i < levelData.gameItems.length; i++) {
            var gameItem = levelData.gameItems[i];
            var x = gameItem.x;
            var y = gameItem.y;
            var type = gameItem.type;

            if (type === 'sawblade') {
                createSawBlade(x, y);
            }

            else if (type === 'street-light') {
                createBox(x,y);
            }

            else if (type === 'enemy') {
                createEnemy(x,y);
            }


        }

    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}