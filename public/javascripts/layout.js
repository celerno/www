function animOut(element) {
               $(element || this)
               .animate({opacity:0.01},3000)
               .animate({opacity:1},3000); 
         }
         jQuery(function($, undefined) {
                var terminal = $('#term_demo').terminal(function(cmdNargs, term) {
                let command = (cmdNargs.split(' ')[0]||'').toLowerCase();

                    var proyectos=function(){
                        term.echo('mixe       ------    un blog adaptado en lengua mixe[mixe.chamizo.org]');
                        term.echo('sitio      ------    source de este sitio[github]');
                        term.echo('cosmos     ------    resúmenes de Cosmos, en español');
                    }
                    var utils=function(){
                     term.echo('mx/us               ------    español / english');
                     term.echo('gif [text]          ------    gifs en 21c/frame 400x100');
                    }
                    if(command==='proyectos' || command==='projects'){
                        proyectos();
                    }
                    else if(command==='tools' || command==='cosas'){
                        utils();
                    }
                    else if(command==='contact' || command==='contacto'){
                        window.location="/contact";
                    }
                    else if(command==='acerca' || command==='about'){
                     
                        window.location.href="/about";
                    }
                    else if(command==='mixe'){
                        term.echo('estás por abandonar esta página...');
                        term.read();
                        window.location="http://mixe.chamizo.org";
                    }
                    else if(command==='cosmos'){
                        term.echo('estás por abandonar esta página...');
                        term.read();
                        window.location='https://medium.com/cosmos-en-espanol';
                    }
                    else if(command==='sitio' || command==='site'){
                        term.echo('estás por abandonar esta página...');
                        term.read();
                        window.location='https://github.com/celerno/www';
                    }
                    else if(command === 'mx'){
                      animOut($('.en'));
                    }
                    else if(command === 'us'){
                      animOut($('.sp'));
                    }
                    else if (command==='/' || command==='home' || command ==='inicio'){
                         window.location="/";
                    }
                    else if (command==='' || command==='menu' || command ==='menú'){
                        term.echo('inicio/home         ------    &#8962;');
                        term.echo('proyectos/projects  ------    proyectos / projects');
                        term.echo('acerca/about        ------    sobre mí / about me');
                        term.echo('cosas/tools         ------    &#128295;');
                        term.echo('?                   ------    &#9072;');
                    }
                    else if (command === 'gif'){
                        gifText(document, cmdNargs.substring(4));
                    }
                    else if (command === '?' || command ==='ayuda' || command==='help'){
                        term.echo('Ayuda / Help: ');    
                        term.echo('escribe [menú] / type [menu]');    
                        term.echo('presiona [Entrar] / hit [Enter]');
                        term.echo('escribe la [opción] deseada / type [option] of your choice');
                    }
                    else if (command !== '') {
                        term.echo('[' + command + '] (._. \')?');
                    }
                }

                , {
                    greetings: 'chamizo.org - []',
                    name: 'js_demo',
                    height: 120,
                    prompt: '_> '
                });
                terminal.exec('', true);
            });