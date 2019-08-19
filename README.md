# AngularPencilDurability

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Manual
### Editing Area
#### write on paper
1. Input your words in the "Write" input field.
2. Hit enter or click on the pencil icon to write words to paper.

*"Write" would only append words

#### Erase the words
1. Use mouse to select the range you would like to erase. The selection range will show in the selection panel on the rigth side of the paper.
2. Click on erase and it will replce the selection with " " backwardly.

*If the selection length is 0 (selection start index = selection end index), it will erase a single char before index.

#### Edit the words
1. Use mouse to select the range you would like to erase. The selection range will show in the selection panel on the rigth side of the paper.
2. Input your words in the "Edit" input field.
3. Hit enter or click on the pencil icon to write words to paper.

#### Sharpen a pencil
1. Hit "Sharpen".

### Refresh Area
#### Create new pencil
1. Input numbers into "Durability" and "Length" input field under "Pencil".
2. Hit "New Pencil".

#### Create new eraser
1. Input numbers into "Durability" input field under "Eraser".
2. Hit "New Eraser".

#### Create new paper
1. Hit "New Paper".

