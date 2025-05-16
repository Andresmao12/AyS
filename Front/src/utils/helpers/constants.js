export const permissions = {
    admin: [
        'Indicador',
        'tipo_indicador',
        'reprensentacion_visual',
        'tipo_actor',
        'fuente',
        'unidad_medicion',
        'sentido',
        'frecuencia',
        'representvisualporindicador',
        'responsablesporindicador',
        'actor',
        'fuentes_por_indicador',
        'variablesporindicador',
        'variable',
        'Usuarios'
    ],
    Verificador: ['Indicador', 'fuente', 'unidad_medicion', 'tipo_indicador',
        'reprensentacion_visual', 'variable'],
    invitado: ['Indicador', 'fuente', 'unidad_medicion', 'variable', 'variablesporindicador'],
    Validador: ['Indicador', 'tipo_indicador', 'fuente', 'actor'],
    Administrativo: ['Indicador', 'tipo_indicador', 'fuente', 'fuentes_por_indicador',
        'variablesporindicador', 'variable']
};