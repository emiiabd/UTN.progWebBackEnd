type Campos_Dispoibles = 'email' | 'nombre de usuario' | 'contraseña'
class Cambio {
    id_cambio: number;
    valor_anterior: string;
    nuevo_valor: string;
    campo: Campos_Dispoibles
    constructor(
        id_cambio: number,
        campo: Campos_Dispoibles,
        valor_anterior: string,
        nuevo_valor: string
    ) {
        this.id_cambio = id_cambio,
        this.campo = campo,
        this.valor_anterior = valor_anterior,
        this.nuevo_valor = nuevo_valor
    }
    mostrarCambio() : void{
        console.log(
            {
                id: this.id_cambio,
                campo: this.campo,
                valor_anterior: this.valor_anterior,
                nuevo_valor: this.nuevo_valor
            }
        )
    }
}
export { Cambio, Campos_Dispoibles }
    Accion.ts
import { Cambio, Campos_Dispoibles } from './Cambio.js'
type Descripcion_Acciones = 'inicio de sesion' | 'cierre de sesion' | 'compra' | 'actualizacion de perfil' | 'envio de mensaje'
class Accion {
    id_accion: number;
    descripcion: Descripcion_Acciones;
    fecha_de_accion: Date
    constructor(id_accion : number, descripcion : Descripcion_Acciones){
        this.id_accion = id_accion
        this.descripcion = descripcion,
        this.fecha_de_accion = new Date()
    }
    mostrarDetalle() : void {
        console.log(
            {
                id: this.id_accion,
                descripcion: this.descripcion,
                fecha: this.fecha_de_accion
            }
        )
    }
}
class Accion_Inicio_De_Sesion extends Accion{
    dispositivo_de_origen: string
    constructor(
        id_accion: number,
        dispositivo_de_origen: string
    ) {
        super(id_accion, 'inicio de sesion')
        this.dispositivo_de_origen = dispositivo_de_origen
    }
    mostrarDetalle(): void {
        console.log(
            {
                id: this.id_accion,
                descripcion: this.descripcion,
                fecha: this.fecha_de_accion,
                dispositivo_de_origen: this.dispositivo_de_origen
            }
        )
    }
}
class Accion_Cierre_De_Sesion extends Accion{
    dispositivo_de_origen: string;
    tiempo_de_sesion: Number
    constructor(
        id_accion: number,
        dispositivo_de_origen: string,
        tiempo_de_sesion: number
    ) {
        super(id_accion, 'cierre de sesion')
        this.dispositivo_de_origen = dispositivo_de_origen
        this.tiempo_de_sesion = tiempo_de_sesion
    }
    mostrarDetalle(): void {
        console.log(
            {
                id: this.id_accion,
                descripcion: this.descripcion,
                fecha: this.fecha_de_accion,
                dispositivo_de_origen: this.dispositivo_de_origen,
                tiempo_de_sesion: this.tiempo_de_sesion
            }
        )
    }
}
class Actualizacion_De_Perfil extends Accion{
    cambios: Cambio[]
    constructor(
        id_accion: number,
    ) {
        super(id_accion, 'actualizacion de perfil')
        this.cambios = []
    }
    agregarCambio(id_accion: number, campo: Campos_Dispoibles, valor_anterior: string, nuevo_valor: string) : Cambio[] {
        const nuevo_cambio_perfil = new Cambio(id_accion, campo, valor_anterior, nuevo_valor)
        this.cambios.push(nuevo_cambio_perfil)
        console.log(nuevo_cambio_perfil.mostrarCambio())
        return this.cambios
    }
    mostrarDetalle() : void {
        console.log(
            {
                id: this.id_accion,
                descripcion: this.descripcion,
                fecha: this.fecha_de_accion,
                cambios: this.cambios
            }
        )
    }
}
class Accion_Compra extends Accion{
    lista_productos: string[]
    producto: string
    total_compras: number
    constructor(
        id_accion: number
    ){
        super(id_accion, 'compra')
        this.lista_productos = []
        this.total_compras = 15000
    }
    agregarProducto(producto : string) : string[]{
        this.lista_productos.push(producto)
        return this.lista_productos
    }
    mostrarDetalle() : void{
        console.log(
            {
                id: this.id_accion,
                descripcion: this.descripcion,
                fecha: this.fecha_de_accion,
                lista_de_productos: this.lista_productos,
                total_de_compras: this.total_compras
            }
        )
    }
}
class Accion_Envio_Mensaje extends Accion{
    destinatario: string
    mensaje: string
    constructor(
        id_accion: number,
        destinatario: string,
        mensaje: string
    ){
        super(id_accion, 'envio de mensaje')
        this.destinatario = destinatario
        this.mensaje = mensaje
    }
    mostrarDetalle(): void {
        console.log(
            {
                id: this.id_accion,
                descripcion: this.descripcion,
                fecha: this.fecha_de_accion,
                destinatario: this.destinatario,
                mensaje: this.mensaje
            }
        )
    }
}
export { Descripcion_Acciones as Descripcion_Acciones, Accion, Accion_Inicio_De_Sesion, Accion_Cierre_De_Sesion, Actualizacion_De_Perfil, Accion_Compra, Accion_Envio_Mensaje}
         main.ts
import { Accion, Accion_Inicio_De_Sesion, Accion_Cierre_De_Sesion, Actualizacion_De_Perfil, Accion_Compra, Accion_Envio_Mensaje } from "./Type/Accion.js";
class Historial {
    acciones: Accion[];
    id_historial: number
    constructor(){
        this.acciones = []
        this.id_historial = 1
    }
    agregarAccion(accion : Accion) : Accion[] {
        this.acciones.push(accion)
        return this.acciones
    }
    eliminarAccionPorId(id : number) : Accion[] {
        const posicion_accion_a_eliminar = this.acciones.findIndex((acciones) => acciones.id_accion === id)
        return this.acciones.splice(posicion_accion_a_eliminar, 1)
    }
    vaciarHistorialAcciones() : Accion[] {
        return this.acciones = []
    }
    mostrarHistorial(){
        console.log(JSON.stringify({acciones: this.acciones}))
    }
}
//instancia historial
const historial = new Historial()
//accion inicio de sesion
const accion_inicio_de_sesion = new Accion_Inicio_De_Sesion(1, 'samsung galaxy s23')
//accion cierre de sesion
const accion_cierre_de_sesion = new Accion_Cierre_De_Sesion(2, 'iphone 13', 120)
//actualizacion perfil
const accion_actualizacion_de_perfil = new Actualizacion_De_Perfil(3)
accion_actualizacion_de_perfil.agregarCambio(25, 'nombre de usuario', 'Juan', 'Juansito')
accion_actualizacion_de_perfil.agregarCambio(20, 'contraseña', 'juan123', 'juan456')
const accion_actualizacion_de_perfil_2 = new Actualizacion_De_Perfil(7)
accion_actualizacion_de_perfil_2.agregarCambio(40, 'nombre de usuario', 'Pepe', 'Pepesito')
accion_actualizacion_de_perfil_2.agregarCambio(42, 'contraseña', 'pepe123', 'pepe456')
//accion compra
const accion_compra = new Accion_Compra(4)
accion_compra.agregarProducto('tv samsung 55"')
accion_compra.agregarProducto('tablet samsung galaxy tab54')
const accion_compra_2 = new Accion_Compra(5)
accion_compra_2.agregarProducto('lavarropas whirpool')
accion_compra_2.agregarProducto('Parlantes Sony')
//enviomensaje
const accion_envio_mensaje = new Accion_Envio_Mensaje(5, 'juansito@gmail.com', 'hola juan como estas?')
historial.agregarAccion(accion_inicio_de_sesion)
historial.agregarAccion(accion_cierre_de_sesion)
historial.agregarAccion(accion_actualizacion_de_perfil)
historial.agregarAccion(accion_actualizacion_de_perfil_2)
historial.agregarAccion(accion_compra)
historial.agregarAccion(accion_compra_2)
historial.agregarAccion(accion_envio_mensaje)
historial.eliminarAccionPorId(5)
historial.eliminarAccionPorId(3)
historial.mostrarHistorial()