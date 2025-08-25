import { Routes } from '@angular/router';

export const routes: Routes = [{
    path: '',
    loadComponent: () => import('./business/login/login.component'),
},
{
    path: 'index',
    loadComponent: () => import('./shared/components/layout/layout.component'),
    children: [
        {
            path: 'menu',
            loadComponent: () => import('./business/menu/index/index.component'),
        },
        {
            path: 'nuevomenu',
            loadComponent: () => import('./business/menu/nuevo/nuevo.component'),
        },
        {
            path: 'updatemenu/:id',
            loadComponent: () => import('./business/menu/actualizar/actualizar.component'),
        },
        {
            path: 'vermenu/:id',
            loadComponent: () => import('./business/menu/ver/ver.component'),
        },
        {
            path: 'rolles',
            loadComponent: () => import('./business/rolles/index/index.component'),
        },
        {
            path: 'nuevorolles',
            loadComponent: () => import('./business/rolles/nuevo/nuevo.component'),
        },
        {
            path: 'updaterolles/:id',
            loadComponent: () => import('./business/rolles/actualizar/actualizar.component'),
        },
        {
            path: 'verrolles/:id',
            loadComponent: () => import('./business/rolles/ver/ver.component'),
        },

        //cat_direcciones --------------------------------------------------------------->
        {
            path: 'cat_direcciones',
            loadComponent: () => import('./business/catalogo/cat_direcciones/index/index.component'),
        },
        {
            path: 'nuevocat_direcciones/:id_usuario',
            loadComponent: () => import('./business/catalogo/cat_direcciones/nuevo/nuevo.component'),
        },
        {
            path: 'updatecat_direcciones/:id_cat_direcciones',
            loadComponent: () => import('./business/catalogo/cat_direcciones/actualizar/actualizar.component'),
        },
        {
            path: 'vercat_direcciones/:id_cat_direcciones',
            loadComponent: () => import('./business/catalogo/cat_direcciones/ver/ver.component'),
        },
        //estatus catalogo_areas --------------------------------------------------------------->
        {
            path: 'estatuscatalogo_areas',
            loadComponent: () => import('./business/catalogo_areas/estatus/inicio/index/index.component'),
        },
        {
            path: 'estatusnuevocatalogo_areas',
            loadComponent: () => import('./business/catalogo_areas/estatus/inicio/nuevo/nuevo.component'),
        },
        {
            path: 'estatusvercatalogo_areas/:id_estatuscatalogo_areas',
            loadComponent: () => import('./business/catalogo_areas/estatus/inicio/ver/ver.component'),
        },
        {
            path: 'estatusactualizarcatalogo_areas/:id_estatuscatalogo_areas',
            loadComponent: () => import('./business/catalogo_areas/estatus/inicio/actualizar/actualizar.component'),
        },
        //cat_areas --------------------------------------------------------------->
        {
            path: 'nuevocat_areas/:id_catalogo_areas/:estatus',
            loadComponent: () => import('./business/catalogo_areas/cat_areas/nuevo/nuevo.component'),
        },
        {
            path: 'updatecat_areas/:id_catalogo_areas/:id_cat_areas',
            loadComponent: () => import('./business/catalogo_areas/cat_areas/actualizar/actualizar.component'),
        },
        {
            path: 'vercat_areas/:id_catalogo_areas/:id_cat_areas',
            loadComponent: () => import('./business/catalogo_areas/cat_areas/ver/ver.component'),
        },
        //catalogo_areas --------------------------------------------------------------->
        {
            path: 'catalogo_areas',
            loadComponent: () => import('./business/catalogo_areas/inicio/index/index.component'),
        },
        {
            path: 'vercatalogo_areas/:id_catalogo_areas/:id_cat_areas',
            loadComponent: () => import('./business/catalogo_areas/inicio/ver/ver.component'),
        },
        {
            path: 'actualizarcatalogo_areas/:id_catalogo_areas/:id_cat_areas/:estatus',
            loadComponent: () => import('./business/catalogo_areas/inicio/actualizar/actualizar.component'),
        },
        //estatus catalogo_empleados --------------------------------------------------------------->
        {
            path: 'estatuscatalogo_empleados',
            loadComponent: () => import('./business/catalogo_empleados/estatus/inicio/index/index.component'),
        },
        {
            path: 'estatusnuevocatalogo_empleados',
            loadComponent: () => import('./business/catalogo_empleados/estatus/inicio/nuevo/nuevo.component'),
        },
        {
            path: 'estatusvercatalogo_empleados/:id_estatuscatalogo_empleados',
            loadComponent: () => import('./business/catalogo_empleados/estatus/inicio/ver/ver.component'),
        },
        {
            path: 'estatusactualizarcatalogo_empleados/:id_estatuscatalogo_empleados',
            loadComponent: () => import('./business/catalogo_empleados/estatus/inicio/actualizar/actualizar.component'),
        },
        //cat_empleados --------------------------------------------------------------->
        {
            path: 'nuevocat_empleados/:id_catalogo_empleados/:estatus',
            loadComponent: () => import('./business/catalogo_empleados/cat_empleados/nuevo/nuevo.component'),
        },
        {
            path: 'updatecat_empleados/:id_catalogo_empleados/:id_cat_empleados',
            loadComponent: () => import('./business/catalogo_empleados/cat_empleados/actualizar/actualizar.component'),
        },
        {
            path: 'vercat_empleados/:id_catalogo_empleados/:id_cat_empleados',
            loadComponent: () => import('./business/catalogo_empleados/cat_empleados/ver/ver.component'),
        },
        //catalogo_empleados --------------------------------------------------------------->
        {
            path: 'catalogo_empleados',
            loadComponent: () => import('./business/catalogo_empleados/inicio/index/index.component'),
        },
        {
            path: 'vercatalogo_empleados/:id_catalogo_empleados/:id_cat_empleados',
            loadComponent: () => import('./business/catalogo_empleados/inicio/ver/ver.component'),
        },
        {
            path: 'actualizarcatalogo_empleados/:id_catalogo_empleados/:id_cat_empleados/:estatus',
            loadComponent: () => import('./business/catalogo_empleados/inicio/actualizar/actualizar.component'),
        },
        //cat_oficio --------------------------------------------------------------->
        {
            path: 'cat_oficio',
            loadComponent: () => import('./business/catalogo/cat_oficio/index/index.component'),
        },
        {
            path: 'nuevocat_oficio/:id_usuario',
            loadComponent: () => import('./business/catalogo/cat_oficio/nuevo/nuevo.component'),
        },
        {
            path: 'updatecat_oficio/:id_cat_oficio',
            loadComponent: () => import('./business/catalogo/cat_oficio/actualizar/actualizar.component'),
        },
        {
            path: 'vercat_oficio/:id_cat_oficio',
            loadComponent: () => import('./business/catalogo/cat_oficio/ver/ver.component'),
        },
        //cat_tipo_oficios --------------------------------------------------------------->
        {
            path: 'cat_tipo_oficios',
            loadComponent: () => import('./business/catalogo/cat_tipo_oficios/index/index.component'),
        },
        {
            path: 'nuevocat_tipo_oficios/:id_usuario',
            loadComponent: () => import('./business/catalogo/cat_tipo_oficios/nuevo/nuevo.component'),
        },
        {
            path: 'updatecat_tipo_oficios/:id_cat_tipo_oficios',
            loadComponent: () => import('./business/catalogo/cat_tipo_oficios/actualizar/actualizar.component'),
        },
        {
            path: 'vercat_tipo_oficios/:id_cat_tipo_oficios',
            loadComponent: () => import('./business/catalogo/cat_tipo_oficios/ver/ver.component'),
        },
        //cat_tipo_seguimiento --------------------------------------------------------------->
        {
            path: 'cat_tipo_seguimiento',
            loadComponent: () => import('./business/catalogo/cat_tipo_seguimiento/index/index.component'),
        },
        {
            path: 'nuevocat_tipo_seguimiento/:id_usuario',
            loadComponent: () => import('./business/catalogo/cat_tipo_seguimiento/nuevo/nuevo.component'),
        },
        {
            path: 'updatecat_tipo_seguimiento/:id_cat_tipo_seguimiento',
            loadComponent: () => import('./business/catalogo/cat_tipo_seguimiento/actualizar/actualizar.component'),
        },
        {
            path: 'vercat_tipo_seguimiento/:id_cat_tipo_seguimiento',
            loadComponent: () => import('./business/catalogo/cat_tipo_seguimiento/ver/ver.component'),
        },
        //estatus registro_quien_firma --------------------------------------------------------------->
        {
            path: 'estatusregistro_quien_firma',
            loadComponent: () => import('./business/registro_quien_firma/estatus/inicio/index/index.component'),
        },
        {
            path: 'estatusnuevoregistro_quien_firma',
            loadComponent: () => import('./business/registro_quien_firma/estatus/inicio/nuevo/nuevo.component'),
        },
        {
            path: 'estatusverregistro_quien_firma/:id_estatusregistro_quien_firma',
            loadComponent: () => import('./business/registro_quien_firma/estatus/inicio/ver/ver.component'),
        },
        {
            path: 'estatusactualizarregistro_quien_firma/:id_estatusregistro_quien_firma',
            loadComponent: () => import('./business/registro_quien_firma/estatus/inicio/actualizar/actualizar.component'),
        },
        //cat_firmante --------------------------------------------------------------->
        {
            path: 'nuevocat_firmante/:id_registro_quien_firma/:estatus',
            loadComponent: () => import('./business/registro_quien_firma/cat_firmante/nuevo/nuevo.component'),
        },
        {
            path: 'updatecat_firmante/:id_registro_quien_firma/:id_cat_firmante',
            loadComponent: () => import('./business/registro_quien_firma/cat_firmante/actualizar/actualizar.component'),
        },
        {
            path: 'vercat_firmante/:id_registro_quien_firma/:id_cat_firmante',
            loadComponent: () => import('./business/registro_quien_firma/cat_firmante/ver/ver.component'),
        },
        //registro_quien_firma --------------------------------------------------------------->
        {
            path: 'registro_quien_firma',
            loadComponent: () => import('./business/registro_quien_firma/inicio/index/index.component'),
        },
        {
            path: 'verregistro_quien_firma/:id_registro_quien_firma/:id_cat_firmante',
            loadComponent: () => import('./business/registro_quien_firma/inicio/ver/ver.component'),
        },
        {
            path: 'actualizarregistro_quien_firma/:id_registro_quien_firma/:id_cat_firmante/:estatus',
            loadComponent: () => import('./business/registro_quien_firma/inicio/actualizar/actualizar.component'),
        },
        //estatus registro_destinatario --------------------------------------------------------------->
        {
            path: 'estatusregistro_destinatario',
            loadComponent: () => import('./business/registro_destinatario/estatus/inicio/index/index.component'),
        },
        {
            path: 'estatusnuevoregistro_destinatario',
            loadComponent: () => import('./business/registro_destinatario/estatus/inicio/nuevo/nuevo.component'),
        },
        {
            path: 'estatusverregistro_destinatario/:id_estatusregistro_destinatario',
            loadComponent: () => import('./business/registro_destinatario/estatus/inicio/ver/ver.component'),
        },
        {
            path: 'estatusactualizarregistro_destinatario/:id_estatusregistro_destinatario',
            loadComponent: () => import('./business/registro_destinatario/estatus/inicio/actualizar/actualizar.component'),
        },
        //cat_destinatario --------------------------------------------------------------->
        {
            path: 'nuevocat_destinatario/:id_registro_destinatario/:estatus',
            loadComponent: () => import('./business/registro_destinatario/cat_destinatario/nuevo/nuevo.component'),
        },
        {
            path: 'updatecat_destinatario/:id_registro_destinatario/:id_cat_destinatario',
            loadComponent: () => import('./business/registro_destinatario/cat_destinatario/actualizar/actualizar.component'),
        },
        {
            path: 'vercat_destinatario/:id_registro_destinatario/:id_cat_destinatario',
            loadComponent: () => import('./business/registro_destinatario/cat_destinatario/ver/ver.component'),
        },
        //registro_destinatario --------------------------------------------------------------->
        {
            path: 'registro_destinatario',
            loadComponent: () => import('./business/registro_destinatario/inicio/index/index.component'),
        },
        {
            path: 'verregistro_destinatario/:id_registro_destinatario/:id_cat_destinatario',
            loadComponent: () => import('./business/registro_destinatario/inicio/ver/ver.component'),
        },
        {
            path: 'actualizarregistro_destinatario/:id_registro_destinatario/:id_cat_destinatario/:estatus',
            loadComponent: () => import('./business/registro_destinatario/inicio/actualizar/actualizar.component'),
        },
        //cat_numero_oficios --------------------------------------------------------------->
        {
            path: 'cat_numero_oficios',
            loadComponent: () => import('./business/catalogo/cat_numero_oficios/index/index.component'),
        },
        {
            path: 'nuevocat_numero_oficios/:id_usuario',
            loadComponent: () => import('./business/catalogo/cat_numero_oficios/nuevo/nuevo.component'),
        },
        {
            path: 'updatecat_numero_oficios/:id_cat_numero_oficios',
            loadComponent: () => import('./business/catalogo/cat_numero_oficios/actualizar/actualizar.component'),
        },
        {
            path: 'vercat_numero_oficios/:id_cat_numero_oficios',
            loadComponent: () => import('./business/catalogo/cat_numero_oficios/ver/ver.component'),
        },
        //estatus gestion_oficios --------------------------------------------------------------->
        {
            path: 'estatusgestion_oficios',
            loadComponent: () => import('./business/gestion_oficios/estatus/inicio/index/index.component'),
        },
        {
            path: 'estatusnuevogestion_oficios',
            loadComponent: () => import('./business/gestion_oficios/estatus/inicio/nuevo/nuevo.component'),
        },
        {
            path: 'estatusvergestion_oficios/:id_estatusgestion_oficios',
            loadComponent: () => import('./business/gestion_oficios/estatus/inicio/ver/ver.component'),
        },
        {
            path: 'estatusactualizargestion_oficios/:id_estatusgestion_oficios',
            loadComponent: () => import('./business/gestion_oficios/estatus/inicio/actualizar/actualizar.component'),
        },
        //oficios --------------------------------------------------------------->
        {
            path: 'nuevooficios/:id_gestion_oficios/:estatus',
            loadComponent: () => import('./business/gestion_oficios/oficios/nuevo/nuevo.component'),
        },
        {
            path: 'updateoficios/:id_gestion_oficios/:id_oficios',
            loadComponent: () => import('./business/gestion_oficios/oficios/actualizar/actualizar.component'),
        },
        {
            path: 'veroficios/:id_gestion_oficios/:id_oficios',
            loadComponent: () => import('./business/gestion_oficios/oficios/ver/ver.component'),
        },
        //gestion_oficios --------------------------------------------------------------->
        {
            path: 'gestion_oficios',
            loadComponent: () => import('./business/gestion_oficios/inicio/index/index.component'),
        },
        {
            path: 'vergestion_oficios/:id_gestion_oficios/:id_oficios',
            loadComponent: () => import('./business/gestion_oficios/inicio/ver/ver.component'),
        },
        {
            path: 'actualizargestion_oficios/:id_gestion_oficios/:id_oficios/:estatus',
            loadComponent: () => import('./business/gestion_oficios/inicio/actualizar/actualizar.component'),
        },
        //estatus gestion_oficios --------------------------------------------------------------->
        {
            path: 'estatusgestion_oficios',
            loadComponent: () => import('./business/gestion_oficios/estatus/inicio/index/index.component'),
        },
        {
            path: 'estatusnuevogestion_oficios',
            loadComponent: () => import('./business/gestion_oficios/estatus/inicio/nuevo/nuevo.component'),
        },
        {
            path: 'estatusvergestion_oficios/:id_estatusgestion_oficios',
            loadComponent: () => import('./business/gestion_oficios/estatus/inicio/ver/ver.component'),
        },
        {
            path: 'estatusactualizargestion_oficios/:id_estatusgestion_oficios',
            loadComponent: () => import('./business/gestion_oficios/estatus/inicio/actualizar/actualizar.component'),
        },
        //oficios --------------------------------------------------------------->
        {
            path: 'nuevooficios/:id_gestion_oficios/:estatus',
            loadComponent: () => import('./business/gestion_oficios/oficios/nuevo/nuevo.component'),
        },
        {
            path: 'updateoficios/:id_gestion_oficios/:id_oficios',
            loadComponent: () => import('./business/gestion_oficios/oficios/actualizar/actualizar.component'),
        },
        {
            path: 'veroficios/:id_gestion_oficios/:id_oficios',
            loadComponent: () => import('./business/gestion_oficios/oficios/ver/ver.component'),
        },
        //gestion_oficios --------------------------------------------------------------->
        {
            path: 'gestion_oficios',
            loadComponent: () => import('./business/gestion_oficios/inicio/index/index.component'),
        },
        {
            path: 'vergestion_oficios/:id_gestion_oficios/:id_oficios',
            loadComponent: () => import('./business/gestion_oficios/inicio/ver/ver.component'),
        },
        {
            path: 'actualizargestion_oficios/:id_gestion_oficios/:id_oficios/:estatus',
            loadComponent: () => import('./business/gestion_oficios/inicio/actualizar/actualizar.component'),
        },

        //estatus usuarios_opdm --------------------------------------------------------------->
        {
            path: 'estatususuarios_opdm',
            loadComponent: () => import('./business/usuarios_opdm/estatus/inicio/index/index.component'),
        },
        {
            path: 'estatusnuevousuarios_opdm',
            loadComponent: () => import('./business/usuarios_opdm/estatus/inicio/nuevo/nuevo.component'),
        },
        {
            path: 'estatusverusuarios_opdm/:id_estatususuarios_opdm',
            loadComponent: () => import('./business/usuarios_opdm/estatus/inicio/ver/ver.component'),
        },
        {
            path: 'estatusactualizarusuarios_opdm/:id_estatususuarios_opdm',
            loadComponent: () => import('./business/usuarios_opdm/estatus/inicio/actualizar/actualizar.component'),
        },
        //users_opdm --------------------------------------------------------------->
        {
            path: 'nuevousers_opdm/:id_usuarios_opdm/:estatus',
            loadComponent: () => import('./business/usuarios_opdm/users_opdm/nuevo/nuevo.component'),
        },
        {
            path: 'updateusers_opdm/:id_usuarios_opdm/:id_users_opdm',
            loadComponent: () => import('./business/usuarios_opdm/users_opdm/actualizar/actualizar.component'),
        },
        {
            path: 'verusers_opdm/:id_usuarios_opdm/:id_users_opdm',
            loadComponent: () => import('./business/usuarios_opdm/users_opdm/ver/ver.component'),
        },
        //usuarios_opdm --------------------------------------------------------------->
        {
            path: 'usuarios_opdm',
            loadComponent: () => import('./business/usuarios_opdm/inicio/index/index.component'),
        },
        {
            path: 'verusuarios_opdm/:id_usuarios_opdm/:id_users_opdm',
            loadComponent: () => import('./business/usuarios_opdm/inicio/ver/ver.component'),
        },
        {
            path: 'actualizarusuarios_opdm/:id_usuarios_opdm/:id_users_opdm/:estatus',
            loadComponent: () => import('./business/usuarios_opdm/inicio/actualizar/actualizar.component'),
        },
        //correspondencia//----------------------------------------------------------->
        {
            path: 'correspondencia',
            loadComponent: () => import('./business/correspondencia/lista/lista.component'),
        },
        {
            path: 'vercorrespondencia/:id_gestion_oficios/:id_oficios',
            loadComponent: () => import('./business/correspondencia/ver/ver.component'),
        },

        //Tecnico//------------------------------------------------------------------>
        {
            path: 'tecnico',
            loadComponent: () => import('./business/tecnico/lista/lista.component'),
        },
        {
            path: 'ver_oficio_tecnico/:id_oficios/:numero_empleado/:id_asignacion',
            loadComponent: () => import('./business/tecnico/ver/ver.component'),
        },
        {
            path: 'actualizar_oficio_tecnico/:id_oficios/:numero_empleado/:id_asignacion',
            loadComponent: () => import('./business/tecnico/actualizar/actualizar.component'),
        },
          //Coordinador//------------------------------------------------------------------>
        {
            path: 'coordinador',
            loadComponent: () => import('./business/coordinador/list/list.component'),
        },
        {
            path: 'historialCoordinador/:id_gestion_oficios/:id_oficios',
            loadComponent: () => import('./business/coordinador/historial/historial.component'),
        },
        {
            path: 'historialCoordinador/:id_gestion_oficios/:id_oficios',
            loadComponent: () => import('./business/coordinador/historial/historial.component'),
        },

         //estatus firma --------------------------------------------------------------->
            {
                path:'estatusfirma',
                loadComponent: () => import('./business/firma/estatus/inicio/index/index.component'),
            },
            {
                path:'estatusnuevofirma',
                loadComponent: () => import('./business/firma/estatus/inicio/nuevo/nuevo.component'),
            },
            {
                path:'estatusverfirma/:id_estatusfirma',
                loadComponent: () => import('./business/firma/estatus/inicio/ver/ver.component'),
            },
            {
                path:'estatusactualizarfirma/:id_estatusfirma',
                loadComponent: () => import('./business/firma/estatus/inicio/actualizar/actualizar.component'),
            },
            //firma_coordinador --------------------------------------------------------------->
            {
                path:'nuevofirma_coordinador/:id_firma/:estatus',
                loadComponent: () => import('./business/firma/firma_coordinador/nuevo/nuevo.component'),
            },
            {
                path:'updatefirma_coordinador/:id_firma/:id_firma_coordinador',
                loadComponent: () => import('./business/firma/firma_coordinador/actualizar/actualizar.component'),
            },
            {
                path:'verfirma_coordinador/:id_firma/:id_firma_coordinador',
                loadComponent: () => import('./business/firma/firma_coordinador/ver/ver.component'),
            },
            //firma --------------------------------------------------------------->
            {
                path:'firma',
                loadComponent: () => import('./business/firma/inicio/index/index.component'),
            },
            {
                path:'verfirma/:id_firma/:id_firma_coordinador',
                loadComponent: () => import('./business/firma/inicio/ver/ver.component'),
            },
            {
                path:'actualizarfirma/:id_firma/:id_firma_coordinador/:estatus',
                loadComponent: () => import('./business/firma/inicio/actualizar/actualizar.component'),
            },


        //MENU ROUTE---------------------------------------------------------->
    ]
},
{
    path: '**',
    redirectTo: 'login',
}
];