# Desafío para Dev

Nombre postulante: Carlos Sebastian Lagos
Link a la app en producción: [LINK DEL DEPLOY]

## Introduccion

- Aplicación desarrollada web con React y Vite que permite a los usuarios buscar y visualizar información sobre personajes de la serie "Rick and Morty" utilizando la [Api de Rick and Morty](https://rickandmortyapi.com/documentation/#graphql)
- Para iniciar la aplicacion de manera local es necesario el comando "npm install" para descargar dependencias, e iniciar con "npm run dev" para iniciar la aplicacion.


### Tecnologias utiizadas

Para esta aplicacion e utilizado tecnologias como:
- TailwindCSS: para darle estilos a la apliccacion de manera eficiente.
- Apollo Client y GraphQL: para poder consumir los datos de la api y poder utilizarlos a lo largo de toda la aplicaion.
- React y vite: como freamworks.
- React-router: para darle dinamismo a la pagina mediante rutas.
- Redux-Toolkit: para el manejo de estados globales para darle mas dinamismo a la aplicacion, en particular sirvio mucho para aplicar los filtros y en la searchbar para que se puedan combinar con mayor facilidad, asi como realizar el empaginado de manera dinamica. Estas funcionalidades como la primera llamada para traer todos los personajes se hagan mediante una unica peticion.  

### Funciones

#### Página de Búsqueda:

En esta funcionalidad aproveche la funcionalidad de graphQL para poder traerme un personaje en especifico y use Redux-Toolkit, para que simplemente modificando un parametro del estado global se haga la peticion.

#### Filtros:

Para esta funcionalida al igual que la anterior aproveche la funcionalidad de graphQL para poder traerme un personaje en especifico y use Redux-Toolkit, para que simplemente modificando un parametro del estado global se haga la peticion, co la diferencia que para utilizar y usar el filtro de "species", tuve que hacer una petiicion aparte para traermme todas las especies que dispone la api, esto mediate una funcion para iterar sobre las diversas paginas que tiene la api y ver que especies disponibles tiene, todo esto realizado en una slice aparte de la de personajes para no hacer el codigo tan pesado de leer.

#### Visualización de Detalles:

En este caso hice uso de los estados locales para hacer la peticion de cada personaje, usando el id que paso por medio de la url, ya que el detalle de cada personaje tiene su propia ruta dinamica.
En el caso de la info hay un pequeño detalle que puede pasar desapercibido que es que los personajes que no tienen subespecie no se renderiza esa info. 

#### GraphQL:

Utilice Apollo client para esta tarea, fue lo que mas me costo de la aplicacion ya que no estoy acostumbrado a hacer peticiones mediante GraphQL, pero fue divertido aprender cosas nuevas y crecer en esta tecnologia.

#### Paginación:

Aprovechando el uso de Redux-toolkit y la busqueda or paginas que ofrece la api pude lograr hacer una muy buena paginacion que ademas de ser dinamica, esta esta libre de bugs posibles que pueden ocurrir al hacer filtrados o busquedas.

### Conclusión:

Disfrute mucho haciendo este challenge ya que e permitio crecer comoprogramador y desarrollar diferentes funciones muy divertidas.
