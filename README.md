Browser Sokoban for CPSC 8710 Fall 23 - Levent Çelik, Akshitha Jakkam, Anjan Kumar Depuru

# Sokoban

Sokoban (Warehouse Keeper) is a classic video game designed in 1981 by Hiroyuki Imabayashi. It's a puzzle game in which the player pushes boxes around a warehouse, trying to get them to storage locations.

The game can be played online through [here](https://LeventCelik.github.io/Sokoban).

# How To Play

## Player's Goal

The player starts at a predetermined location on a map with boxes and targets. Then, they try to move the boxes to the targets without getting stuck and in as few moves as possible.

The player can move Sokoban (the character) in the four directions: east, west, up, north. Sokoban cannot move through walls, but can push boxes as long as the direction of the push is clear. Sokoban can only push one box at a time. The game has multiple levels, and a level ends when all boxes are put to targets.

## Movement

The player can use the arrow buttons or the W, A, S, D keys to move. Additionally, they can use the 'U' button to undo the last move, 'R' to restart the level, 'N' to skip the level, and 'B' to go to the previous level. Note that undo moves do not stack; i.e., the player cannot chain undo actions.

## Levels

Levels are not designed by us. Instead, we have adapted them from the classical Sokoban game.

*Note: Levels are simply JSON files for object locations. We parse them into game data.*

## Getting Stuck

The game can get stuck when the player moves boxes into positions where they cannot retrieve them. This forces the player to think ahead, adding a layer of difficulty to the game.

# Dependencies and References

This game is built entirely using JavaScript, HTML, and CSS.

## Phaser

The game runs on [Phaser 3](https://phaser.io), an open source and lightweight game engine for browser games.

## Assets

- For tiles, we use the free [Kenney Sokoban Assets](https://kenney.nl/assets/sokoban).
- For keyboard buttons, we use the [SimpleKeys](https://beamedeighth.itch.io/simplekeys-animated-pixel-keyboard-keys?download) by the creator beamedeight.
- We use [Pixel Emulator Font](https://www.dafont.com/pixel-emulator.font) by [Pixel Sagas](http://www.pixelsagas.com).

## Outside Help

- We have taken great help from [Ourcade Sokoban Template](https://ourcade.co/templates/sokoban-template/) especially during the start of the project, as we still learn Phaser. However, not only the end result is significantly different, our approach to the game was completely independent after the point of important assets and putting the character on the canvas - which was refactored later as well. We have neither copied any code, or gone through the algorithms of the previous implementations.
- We have referred to the [Discord Phaser Community](https://discord.gg/phaser) at times for Phaser help.

# Development

Overall, building the game was relatively easy and a lot of fun. Phaser is easy to get into, and Sokoban did not require any specific skills.

Our longest struggle was the resizing and rescaling of the game environment. We wanted to have a dynamically defined game canvas according to screen and window size instead of a predetermined area. This proved rather hard and required several iterations of different approaches.

Our second largest struggle was somewhat related: displaying the keyboard information side by side with the game. The panel that holds the keyboard information is a second Phaser scene ran on top of the game, and manipulating the cameras created issues with the layout. We have found some workarounds, but we intend to implement better ways to handle scaling.

Currently, the scaling is not working perfectly. This can be observed particularly well by the keyboard buttons resizing, which we decided to keep as a _feature_.

Choice of Phaser was a good idea - there are numerous resources online for learning the basics, as well as examples for more complicated functionality. Moreover, it can almost trivially be deployed into a web server; thus, can easily be developed.
