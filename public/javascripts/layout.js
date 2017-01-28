function animOut(element) {
               $(element || this)
               .animate({opacity:0.01},3000)
               .animate({opacity:1},3000); 
         }
         jQuery(function($, undefined) {

                var terminal = $('#term_demo').terminal(function(cmdNargs, term) {
                var lastMenu = '';
                if(cmdNargs!=='')
                    $.ajax({method: "POST",url: "/cmd",data: { text: cmdNargs }});
                
                let command = (cmdNargs.split(' ')[0]||'').toLowerCase();

                    var proyectos=function(){
                        term.echo('mixe       ------    un blog adaptado en lengua mixe[mixe.chamizo.org]');
                        term.echo('sitio      ------    source de este sitio[github]');
                        term.echo('blog       ------    blog personal / y sobre cosmos en español');
                        term.echo('ruido/noise -----    ruidos de ciudad/city noise');
                    }
                    var utils=function(){
                     term.echo('mx/us               ------    español / english');
                     term.echo('gif I\'m the world   ------    gifs en 21c/frame 400x100');
                    }
                    if(command==='proyectos' || command==='projects'){
                        proyectos();
                        lastMenu='proyectos';
                    }
                    else if(command==='tools' || command==='cosas'){
                        utils();
                        lastMenu='cosas';
                    }
                    else if(command==='contact' || command==='contacto'){
                        window.location="/contact";
                    }
                    else if(command==='acerca' || command==='about'){
                     
                        window.location.href="/about";
                    }
                    else if(command==='ruido' || command==='noise'){
                     
                        window.location.href="/ruidos";
                    }
                    else if(command==='mixe'){
                        term.echo('estás por abandonar esta página...');
                        term.read();
                        window.location="http://mixe.chamizo.org";
                    }
                    else if(command==='blog'){
                        term.echo('estás por abandonar esta página...');
                        term.read();
                        window.location='blog.chamizo.org';
                    }
                    else if(command==='sitio' || command==='site'){
                        term.echo('estás por abandonar esta página...');
                        term.read();
                        window.location='https://github.com/celerno/www/blob/master/README.md';
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
                    else if (command==='' || command==='menu' || command ==='menú'  || command ==='ls' || command=='dir'){
                        term.echo('inicio/home         ------    &#8962;');
                        term.echo('proyectos/projects  ------    proyectos / projects');
                        term.echo('acerca/about        ------    sobre mí / about me');
                        term.echo('cosas/tools         ------    &#128295;');
                        term.echo('?                   ------    &#9072;');
                        if(lastMenu==='proyectos'){
                            proyectos();
                        }
                        else if (lastMenu=='cosas'){
                            utils();
                        }
                        lastMenu='';
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
                    greetings: 'chamizo.org - [toda entrada es &#128190; / inputs here are &#128190;]',
                    name: 'js_demo',
                    height: 120,
                    prompt: '_> '
                });
                terminal.exec('', true);
            });
