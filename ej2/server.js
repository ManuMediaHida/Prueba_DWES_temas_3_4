import express from "express";
const app = express()

let alumnos = [
    { 
        id: 0, 
        nombre: "Eva", 
        edad: 20, 
        domicilio:{
            calle: "Antigua",
            num: 3,
            localidad: 'Lucena',
        }
    },

    { 
        id: 1, 
        nombre: "Manu", 
        edad: 24, 
        domicilio:{
            calle: "Aleluya",
            num: 31,
            localidad: 'Montilla',
        }
    },

    { 
        id: 2, 
        nombre: "Jose Antonio", 
        edad: 42, 
        domicilio:{
            calle: "La Redonda",
            num: 33,
            localidad: 'Puente Genil',
        }
    },

    { 
        id: 3, 
        nombre: "Miguel", 
        edad: 20, 
        domicilio:{
            calle: "Carrera",
            num: 3,
            localidad: 'Aguilar',
        }
    },
]

app.use(express.json())  

//GET
app.get('/api/alumnos', (request, response) => response.json(alumnos))

// POST 
app.post('/api/alumnos', (request, response) => {
    if ( !request.is('json') )
        return response.json({ message: 'Debes proporcionar datos JSON' })

    let sig = Math.max( ...alumnos.map( u => u.id ))+1

    const { nombre, edad, domicilio } = request.body
    alumnos.push({ id:sig, nombre, edad, domicilio })
    return response.json(({ id:sig, nombre, edad, domicilio }))
})

// GET por id
app.get('/api/alumnos/:id', (request, response) => {
    let usuario = alumnos.find(user => user.id == request.params.id)

    if (usuario !== undefined) { // Si es encontrado    
        return response.json(usuario)
    } else {
        response.json({ message: 'El elemento no ha sido encontrado' })
    }
})

// PUT
app.put('/api/alumnos/:id', (request, response) => {
    if ( !request.is('json') )
        return response.json({ message: 'Debes proporcionar datos JSON' })

    const { id } = request.params
    const { nombre, edad } = request.body

    // Obtenemos posición    
    const pos = alumnos.findIndex(user => user.id == id)

    if (pos != -1) { // Si es encontrado
        alumnos.splice(pos, 1, { id, nombre, edad })
        return response.json(({ id, nombre, edad, domicilio }))
    } else { // Sino
        response.json({ message: 'El elemento no ha sido encontrado' })
    }
})

// DELETE
app.delete('/api/alumnos/:id', (request, response) => {
    // Obtenemos posición    
    const pos = alumnos.findIndex(user => user.id == request.params.id)

    if (pos != -1) { // Si es encontrado
        alumnos.splice(pos, 1)
        return response.json(alumnos)
    } else { // Sino
        response.json({ message: 'El elemento no ha sido encontrado' })
    }
})


app.listen(3000)