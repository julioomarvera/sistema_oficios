import { Component, ViewChild, ChangeDetectionStrategy, inject, signal, Pipe, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormControl, FormsModule, ReactiveFormsModule, Validators, FormBuilder, FormGroup, } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule, _MatSlideToggleRequiredValidatorModule, } from '@angular/material/slide-toggle';
import Swal from 'sweetalert2'
import { Nuevooficios } from '../../../../interfaces/gestion_oficios/oficios/oficios-response.interface';
import { oficiosService } from '../../../../service/gestion_oficios/oficios/oficios.service';
import { estatusgestion_oficiosTable } from '../../../../interfaces/gestion_oficios/estatus/estatusgestion_oficios-table.interface';
import { estatusgestion_oficiosService } from '../../../../service/gestion_oficios/estatus/estatusgestion_oficios.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../../../service/error.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { oficiosTable } from '../../../../interfaces/gestion_oficios/oficios/oficios-table.interface';
import { cat_oficioTable } from '../../../../interfaces/catalogo/cat_oficio/cat_oficio-table.interface';
import { cat_oficioService } from '../../../../service/catalogo/cat_oficio/cat_oficio.service';
import { cat_tipo_oficiosTable } from '../../../../interfaces/catalogo/cat_tipo_oficios/cat_tipo_oficios-table.interface';
import { cat_tipo_oficiosService } from '../../../../service/catalogo/cat_tipo_oficios/cat_tipo_oficios.service';
import { cat_numero_oficiosTable } from '../../../../interfaces/catalogo/cat_numero_oficios/cat_numero_oficios-table.interface';
import { cat_numero_oficiosService } from '../../../../service/catalogo/cat_numero_oficios/cat_numero_oficios.service';
import NuevoComponentFirmante from '../../../registro_quien_firma/cat_firmante/nuevo/nuevo.component'
import NuevoComponentDestinatario from '../../../registro_destinatario/cat_destinatario/nuevo/nuevo.component';
import { Firmante } from '../../../../interfaces/firmantes/firmante.interfaces';
import { cat_firmanteService } from '../../../../service/registro_quien_firma/cat_firmante/cat_firmante.service';
import { cat_firmanteTable } from '../../../../interfaces/registro_quien_firma/cat_firmante/cat_firmante-table.interface';
import { Destinatario } from '../../../../interfaces/destinatrario/destinatario.interfaces';
import { cat_destinatarioService } from '../../../../service/registro_destinatario/cat_destinatario/cat_destinatario.service';
import { cat_destinatarioTable } from '../../../../interfaces/registro_destinatario/cat_destinatario/cat_destinatario-table.interface';
import { PdfExtractorService } from '../../../../service/pdf-extractor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { cat_areasService } from '../../../../service/catalogo_areas/cat_areas/cat_areas.service';
import { cat_areasTable } from '../../../../interfaces/catalogo_areas/cat_areas/cat_areas-table.interface';
import { JsonPipe } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { formatDate } from '@angular/common';



// import jsPDF from 'jspdf';

@Component({
  selector: 'app-nuevo',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatChipsModule,
    MatIconModule, CommonModule, MatFormFieldModule,
    MatTableModule, MatPaginatorModule, MatInputModule,
    MatSortModule, MatButtonModule, MatDialogModule,
    FormsModule, ReactiveFormsModule, MatDatepickerModule,
    MatSlideToggleModule, FormsModule, _MatSlideToggleRequiredValidatorModule,
    MatButtonModule, ReactiveFormsModule, NuevoComponentFirmante, NuevoComponentDestinatario],
  templateUrl: './nuevo.component.html',
  styleUrl: './nuevo.component.scss'
})

export default class NuevoComponent{
  public id_gestion_oficios: number | any;
  loading: boolean = false;
  listoficios: oficiosTable[] = [];
  listestatusgestion_oficios: estatusgestion_oficiosTable[] = [];
  id_estatusgestion_oficios: number | any;
  descripcion: string | any;
  estatus: string | any;
  readonly dialog = inject(MatDialog);
  errorMessage = signal('');
  token: string | any;
  id_usuario: string | any;
  id_rol: string | any;
  imp: string | any;
  edit: string | any;
  elim: string | any;
  nuev: string | any;
  img: string | any;
  PaginaActual: string | any;
  finalizado: string | any;
  oficio: string | any = '1';
  resultadooficio: boolean = false;
  erroroficio: boolean = false;

  text_oficio: string | any = 'Interno / interno';
  resultadotext_oficio: boolean = false;
  errortext_oficio: boolean = false;

  folio: string | any = 'n/a';
  resultado_folio: boolean = false;
  error_folio: boolean = false;

  tipo_oficio: string | any = '3';
  resultadotipo_oficio: boolean = false;
  errortipo_oficio: boolean = false;

  text_tipo: string | any = 'Oficio';
  resultadotext_tipo: boolean = false;
  errortext_tipo: boolean = false;

  numero_oficio: string | any = '';
  resultadonumero_oficio: boolean = false;
  errornumero_oficio: boolean = false;

  fecha_hora: string | any = ''
  resultadofecha_hora: boolean = false;
  errorfecha_hora: boolean = false;

  caso_cop: string | any = 'n/a';
  resultadocaso_cop: boolean = false;
  errorcaso_cop: boolean = false;

  asunto: string | any = ''
  resultadoasunto: boolean = false;
  errorasunto: boolean = false;

  contenido: string | any = ''
  resultadocontenido: boolean = false;
  errorcontenido: boolean = false;

  archivo_oficio: string | any = '';
  archivo_oficioImagen: string | any = '';
  resultadoarchivo_oficio: boolean = false;
  errorarchivo_oficio: boolean = false;

  otro: string | any = 'n/a'
  resultadootro: boolean = false;
  errorotro: boolean = false;

  listcat_oficios: cat_oficioTable[] = [];
  listcat_tipo_oficios: cat_tipo_oficiosTable[] = [];
  listcat_numero_oficios: cat_numero_oficiosTable[] = [];
  listDestinatario: cat_destinatarioTable[] = [];
  list_areas_comparativa: cat_areasTable[] = [];

  listcat_firmante: cat_firmanteTable | null = null;

  fotoFirmante: string = "";
  nombreFirmante: string = "";
  direccionFirmante: string = "";
  areaFirmante: string = "";
  id_area_firmante: string = "";

  divFirmantes = 0;
  divDestinatarios = 0;
  subDestinatarios = 0;

  private fileTmp: any;
  banderaVerPanelFirmante: boolean = false;

  @ViewChild(NuevoComponentFirmante)
  nuevoFirmanteComponent!: NuevoComponentFirmante;

  @ViewChild(NuevoComponentDestinatario)
  nuevoFirmanteDestinatario!: NuevoComponentDestinatario;

  documentoTexto: string | any = 'documentoTexto';
  documentoTextoHTML: SafeHtml | any = '';
  list_areas_pdf: any = [];

  copiaConocimiento: boolean = false;
  respuestaConCopia: string | any = 'NO';

  private _snackBar = inject(MatSnackBar);
  usuario: string | any = "";
  saludo: string | any = "";

 
  hoy = new Date();


  constructor(private router: Router, private _formBuilder: FormBuilder,
    private oficios_Service: oficiosService, private toastr: ToastrService,
    private _errorService: ErrorService, private aRouter: ActivatedRoute,
    private _cat_oficiosServices: cat_oficioService,
    private _cat_tipo_oficiosServices: cat_tipo_oficiosService,
    private _cat_numero_oficiosServices: cat_numero_oficiosService,
    private _sanitizer: DomSanitizer,
    private _estatusgestion_oficiosServices: estatusgestion_oficiosService,
    private cat_firmanteService: cat_firmanteService,
    private _cat_destinatarioService: cat_destinatarioService,
    private pdfExtractorService: PdfExtractorService,
    private snackBar: MatSnackBar,
    private cat_areasService: cat_areasService,
  ) {
    this.id_gestion_oficios = aRouter.snapshot.paramMap.get('id_gestion_oficios');
    this.estatus = aRouter.snapshot.paramMap.get('estatus');
    this.token = localStorage.getItem('token');
    this.id_usuario = localStorage.getItem('id_usuario');
    this.id_rol = localStorage.getItem('id_rol');
    this.imp = localStorage.getItem('imp');
    this.edit = localStorage.getItem('edit');
    this.elim = localStorage.getItem('elim');
    this.nuev = localStorage.getItem('nuev');
    this.img = localStorage.getItem('img');
    this.usuario = localStorage.getItem('usuario');

    this.PaginaActual = '/index/nuevooficios';
    this.finalizado = 1;
    this.getCatEstatusgestion_oficios();
    this.getInfoCat_cat_oficios();
    this.getInfoCat_cat_tipo_oficios();
    this.getInfoCat_cat_numero_oficios();
    this.getInfofirmante(this.id_gestion_oficios);
    this.getInfoDestinatario(this.id_gestion_oficios);
    this.getCatalogoArea();
    this.getSaludo();
  }

  getSaludo() {
    const hora = new Date().getHours();

    if (hora >= 5 && hora < 12) {
      this.saludo = '¡Buenos días!';
    } else if (hora >= 12 && hora < 18) {
      this.saludo = '¡Buenas tardes!';
    } else {
      this.saludo = '¡Buenas noches!';
    }
  }






  actualizarFechaHora() {
    const opciones: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'America/Mexico_City'
    };

    this.fecha_hora = new Intl.DateTimeFormat('es-MX', opciones).format(new Date());
  }

  fechaFinValidator() {
    return (control: import('@angular/forms').AbstractControl) => {
      const fechaInicio = new Date(); // fija, porque el campo está deshabilitado
      const fechaFin = control.value;

      if (!fechaFin) return null;

      if (fechaFin < fechaInicio) {
        return { fechaFinInvalida: true };
      }

      return null;
    };
  }



  getInfoCat_cat_oficios() {
    this._cat_oficiosServices.getAllcat_oficio(this.id_usuario).subscribe(data => {
      this.listcat_oficios = data;
    })
  }
  getInfoCat_cat_tipo_oficios() {
    this._cat_tipo_oficiosServices.getAllcat_tipo_oficios(this.id_usuario).subscribe(data => {
      this.listcat_tipo_oficios = data;
    })
  }
  getInfoCat_cat_numero_oficios() {
    this._cat_numero_oficiosServices.get_seguimiento_numero_oficios(this.id_usuario).subscribe(data => {
      this.numero_oficio = data;
    })
  }
  openHelper() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  getCatEstatusgestion_oficios() {
    this._estatusgestion_oficiosServices.getAllestatusgestion_oficios(this.id_usuario).subscribe((data) => {
      this.listestatusgestion_oficios = data;
    })
  }

  getCatalogoArea() {
    this.cat_areasService.getAllcat_areas(this.id_usuario).subscribe((data) => {
      this.list_areas_comparativa = data;
    })
  }


  goInicio() {
    this.router.navigate(['/index/gestion_oficios']);
  }


  save() {
    this.erroroficio = false;
    this.errortext_oficio = false;
    this.errortipo_oficio = false;
    this.errortext_tipo = false;
    this.errornumero_oficio = false;
    this.errorfecha_hora = false;
    this.errorcaso_cop = false;
    this.errorasunto = false;
    this.errorcontenido = false;
    this.errorarchivo_oficio = false;
    this.errorotro = false;
    if (this.oficio == '') {
      this.erroroficio = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro oficio')
    }
    else if (this.text_oficio == '') {
      this.errortext_oficio = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro text_oficio')
    }
    else if (this.tipo_oficio == '') {
      this.errortipo_oficio = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro tipo_oficio')
    }
    else if (this.text_tipo == '') {
      this.errortext_tipo = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro text_tipo')
    }
    else if (this.numero_oficio == '') {
      this.errornumero_oficio = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro numero_oficio')
    }
    else if (this.fecha_hora == '') {
      this.errorfecha_hora = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro fecha_hora')
    }
    else if (this.caso_cop == '') {
      this.errorcaso_cop = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro caso_cop')
    }
    else if (this.asunto == '') {
      this.errorasunto = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro asunto')
    }
    else if (this.contenido == '') {
      this.errorcontenido = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro contenido')
    }
    else if (this.archivo_oficio == '') {
      this.errorarchivo_oficio = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro archivo_oficio')
    }
    else if (this.otro == '') {
      this.errorotro = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro otro')
    }
    else {
      this.saveParams();
    }
  }

  saveParams() {
    this.loading = true;
    const oficios: Nuevooficios = {
      id_gestion_oficios: this.id_gestion_oficios,
      id_usuario: this.id_usuario,
      id_estatusgestion_oficios: this.estatus,
      PaginaActual: this.PaginaActual,
      finalizado: this.finalizado,
      oficio: this.oficio,
      text_oficio: this.text_oficio,
      folio: this.folio,
      text_tipo: this.text_tipo,
      numero_oficio: this.numero_oficio,
      fecha_hora: this.fecha_hora,
      caso_cop: this.caso_cop,
      asunto: this.asunto,
      contenido: this.contenido,
      archivo_oficio: this.archivo_oficio,
      otro: this.otro,
      activo: 1,
      tipo_oficio: undefined
    }
    this.oficios_Service.newoficios(oficios).subscribe({
      next: (v) => {
        this.toastr.success('Registro almacenado Correctamente', 'Correcto', { "positionClass": "toast-bottom-center" });
        this.router.navigate(['/index/gestion_oficios']);
      },
      error: (event: HttpErrorResponse) => {
        this._errorService.msjError(event);
        this.loading = false;
      },
      complete: () => console.info('complete')
    })
  }

  getFile($event: any, tipo: any): void {
    const [file] = $event.target.files;
    this.fileTmp = {
      fileRaw: file,
      fileName: file.name
    }

    if (file != null) {

      this.sendFile(tipo);
      // if (tipo === 'prueba.pdf') {
      // Llama al servicio PdfExtractorService
      this.pdfExtractorService.extractTextHybrid(file).then(text => {
        this.documentoTexto = text;
        this.snackBar.open('Texto extraído correctamente ✅', 'Cerrar', {
          duration: 4000,
          panelClass: ['snackbar-success']
        });
        this.loading = false;
        this.extractCampos(text);

      }).catch(error => {

        this.snackBar.open('Error al procesar el PDF ❌', 'Cerrar', {
          duration: 5000,
          panelClass: ['snackbar-error']
        });

      });

      // }
    }
  }

  extractCampos(texto: string): Record<string, string> {

    const campos: Record<string, string> = {};

    // Número de oficio
    const oficioMatch = texto.match(/OFICIO(?:[:\s]+|[\s]+N[ÚU]MERO[\s:]+)([A-Z\/\d]+\/\d{4})/i);
    campos['numeroOficio'] = oficioMatch?.[1] ?? '';

    if (campos['numeroOficio'] != "") {
      this.numero_oficio = campos['numeroOficio'];
    } else {
      this.numero_oficio = "n/a";
    }


    // Número de Folio
    const FolioMatch = texto.match(/OFP[/\s]*([A-Z\/\d]+\/\d{4})/i);
    campos['folio'] = FolioMatch?.[1] ?? '';

    if (campos['numeroOficio'] != "") {
      this.folio = campos['folio'];
    } else {
      this.folio = "n/a";
    }


    // Numero de Caso
    const CasoMatch = texto.match(/CASO[:\s]*([A-Z\/\d]+\/\d{4})/i);
    campos['caso_cop'] = CasoMatch?.[1] ?? '';
    if (campos['caso_cop'] != "") {
      this.caso_cop = campos['caso_cop'];
    } else {
      this.caso_cop = "n/a";
    }

    // Asunto (hasta la palabra Tlalnepantla)
    // Asunto - **MODIFICADO**
    // Captura todo después de "ASUNTO:" hasta el siguiente salto de línea
    const asuntoMatch = texto.match(/ASUNTO[:\s]*([\s\S]*?)(?=\s*\b\d{2} de \w+ de \d{4}\b|\s*Tlalnepantla de Baz)/i);
    campos['asunto'] = asuntoMatch?.[1]?.trim() ?? '';
    if (campos['asunto'] != "") {
      this.asunto = campos['asunto'];
    } else {
      this.asunto = "";
    }


    // Fecha del documento
    // const fechaMatch = texto.match(/Estado de México a\s+([\d]{2} de \w+ de \d{4})/i);
    // campos['fecha'] = fechaMatch?.[1] ?? '';
    //this.fecha = campos['fecha'];

    // Destinatario (quien recibe la carta)
    // const destinatarioRegex = /\b(?:MTRA\.|MTRO\.|LIC\.|ING\.|ARQ\.|C\.|CP\.|LCCP\.)\s+([\w\sÁÉÍÓÚÑÜ]+)(?=\s+PRESENTE)/gi;
    // const matches = [...texto.matchAll(destinatarioRegex)];
    // const nombres = matches.map(match => match[1].trim());

    // Obtener fragmentos antes de "PRESENTE" y "C.c.p."
    const fragmentoPresenteMatch = texto.match(/([\s\S]*?)PRESENTE/i);
    const fragmentoCcpMatch = texto.match(/([\s\S]*?)C\.c\.p\./i);
    const fragmentoCcpMatch2 = texto.match(/([\s\S]*?)Ccp/i);
    const fragmentoCepMatch1 = texto.match(/([\s\S]*?)C\.e\.p\./i);
    const fragmentoCepMatch2 = texto.match(/([\s\S]*?)Cep/i);
    // Unir ambos fragmentos si existen
    let textoPrevio = '';
    if (fragmentoPresenteMatch) textoPrevio += fragmentoPresenteMatch[1];
    if (fragmentoCcpMatch) textoPrevio += fragmentoCcpMatch[1];
    if (fragmentoCcpMatch2) textoPrevio += fragmentoCcpMatch2[1];
    if (fragmentoCepMatch1) textoPrevio += fragmentoCepMatch1[1];
    if (fragmentoCepMatch2) textoPrevio += fragmentoCepMatch2[1];
    // Normalizar texto
    const textoNormalizado = textoPrevio.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Preparar descripciones de áreas
    const posiblesAreas: string[] = this.list_areas_comparativa.map(area =>
      area.descripcion.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim()
    );


    // Filtrar áreas detectadas
    const areasDetectadas = posiblesAreas.filter(areaDesc =>
      textoNormalizado.includes(areaDesc)
    );

    this.list_areas_pdf = areasDetectadas;




    //this.destinatario = campos['destinatario'];

    // Firmante (quien firma el documento)
    const firmaMatch = texto.match(/ATENTAMENTE\s*[,–-]?\s*([\s\S]*?)C\.?\s*FELIDES/i);
    campos['firmante'] = firmaMatch?.[1].trim() ?? '';
    //this.firmante = campos['firmante'];
    const index = texto.indexOf('PRESENTE');
    const parteFinal = index !== -1 ? texto.slice(index + 'PRESENTE'.length).trim() : '';
    this.contenido = parteFinal;

    if (this.list_areas_pdf.length > 0) {
      this.nuevoFirmanteDestinatario.getObtenerAreasPdf(this.list_areas_pdf);
      this.nuevoFirmanteComponent.agregarFirmante();
    }


    //Lógica para extraer áreas después de C.c.p. - **MODIFICADO**

    let textoParaAreas = '';
    const ccpRegex = /(C\.c\.p\.|Ccp|C\.e\.p\.|Cep)/i;
    const ccpMatch = texto.match(ccpRegex);

    if (ccpMatch) {
      // Encontrar el índice de la ocurrencia de "C.c.p." o sus variantes
      const inicioCcpIndex = texto.indexOf(ccpMatch[0], ccpMatch.index);
      if (inicioCcpIndex !== -1) {
        textoParaAreas = texto.substring(inicioCcpIndex); // Extraer desde C.c.p. en adelante
      }
    }

    // Normalizar el texto SOLO para la búsqueda de áreas
    const textoNormalizadoParaAreas = textoParaAreas.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Preparar descripciones de áreas
    const posiblesAreas2: string[] = this.list_areas_comparativa.map(area =>
      area.descripcion.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim()
    );

    // Filtrar áreas detectadas
    const areasDetectadas2 = posiblesAreas2.filter(areaDesc =>
      textoNormalizadoParaAreas.includes(areaDesc)
    );

    this.list_areas_pdf = areasDetectadas2;

    // Firmante (quien firma el documento)
    const firmaMatch2 = texto.match(/ATENTAMENTE\s*[,–-]?\s*([\s\S]*?)C\.?\s*FELIDES/i);
    campos['firmante'] = firmaMatch2?.[1].trim() ?? '';
    // this.firmante = campos['firmante'];

    const index2 = texto.indexOf('PRESENTE');
    const parteFinal2 = index2 !== -1 ? texto.slice(index2 + 'PRESENTE'.length).trim() : '';
    this.contenido = parteFinal2;

    if (this.list_areas_pdf.length > 0) {
      this.nuevoFirmanteDestinatario.getObtenerAreasPdf(this.list_areas_pdf);
      this.nuevoFirmanteComponent.agregarFirmante();
    }

    this.loading = false;
    return campos;



  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  sendFile(tipo: any): void {
    this.openSnackBar("" + this.saludo + " " + this.usuario, " " + "Esperé un momento, por favor. Se está extrayendo la información");
    const body = new FormData();
    body.append('myfile', this.fileTmp.fileRaw, this.fileTmp.fileName);
    if (body) {
      this.oficios_Service.sendFileoficios(body, tipo, this.id_gestion_oficios).subscribe({
        next: (v) => {
          console.log(v);
          this.transform(v.url, tipo);
        },
        error: (event: HttpErrorResponse) => {
          this._errorService.msjError(event);
          this.loading = false;
        },
        complete: () => console.info('complete')
      })
    }
  }
  transform(ruta: string, tipo: any): SafeHtml {
    switch (tipo) {
      case 'archivo_oficio':
        this.archivo_oficioImagen = this._sanitizer.bypassSecurityTrustResourceUrl(ruta);
        this.archivo_oficio = ruta;
        break;
    }
    return (ruta);
  }

  getOficio(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedIndex = selectElement.selectedIndex;
    const selectedText = selectElement.options[selectedIndex].text;
    this.text_oficio = selectedText;
  }

  getTipoOficio(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedIndex = selectElement.selectedIndex;
    const selectedText = selectElement.options[selectedIndex].text;
    this.text_tipo = selectedText;
  }

  //   generatePdfFromEditorContent(): void {
  //   const doc = new jsPDF();

  //   const content = this.editorControl.value || 'Sin contenido';

  //   // Maneja contenido HTML usando el plugin html2canvas + jsPDF
  //   doc.text(content, 10, 10); // Esto es texto plano

  //   doc.save('contenido-desde-editor.pdf');
  // }


  handleFirmante(firmante: Firmante) { // esta es la conestacion que contiene el id del almacenamiento del firmante

    const id_gestion_oficios = firmante
    this.getInfofirmante(id_gestion_oficios);
    // lógica para manejar el dato recibido
  }

  handleArea(destinatario: Destinatario) {
    const id_gestion_oficios = destinatario
    this.getInfoDestinatario(id_gestion_oficios);
  }

  getInfofirmante(id_gestion_oficios: any) {
    this.cat_firmanteService.getcat_firmanteByid_gestion_oficios(this.id_gestion_oficios).subscribe((data: cat_firmanteTable) => {
      this.fotoFirmante = data.foto;
      this.nombreFirmante = data.text_nombre_empleado;
      this.direccionFirmante = data.text_direccion;
      this.id_area_firmante = data.id_area;
      this.areaFirmante = data.area_texto;
      this.banderaVerPanelFirmante = true;


    })
  }

  getInfoDestinatario(id_gestion_oficios: any) {
    this._cat_destinatarioService.getregistro_destinatarioByid_gestion_oficios(this.id_gestion_oficios).subscribe(data => {
      this.listDestinatario = data;
      //limpiamos el arreglo primero antes de llenar //------------------------------------------------------------------
      this.nuevoFirmanteDestinatario.limpiarArreglo();
      //-----------------------------------------------------------------------------------------------------------------
      const idsFirmantes = this.listDestinatario.map(dest => dest.id_area).filter((id, index, self) => self.indexOf(id) === index);
      idsFirmantes.forEach(id => {
        const idarea = parseInt(id);
        this.nuevoFirmanteDestinatario.catalogoAreasPorOcultar(idarea);
      });
      //esta es para el firmante //--------------------------------------------
      const idareaFirmante = parseInt(this.id_area_firmante);
      this.nuevoFirmanteDestinatario.catalogoAreasPorOcultar(idareaFirmante);
      //------------------------------------------------------------------------
      const numeroFirmantes = this.listDestinatario.length;
      if (numeroFirmantes <= 2) {
        this.divFirmantes = 6;
        this.divDestinatarios = 6;
        this.subDestinatarios = 6;
      }
      else if (numeroFirmantes == 3) {
        this.divFirmantes = 6;
        this.divDestinatarios = 6;
        this.subDestinatarios = 4;
      }
      else if (numeroFirmantes == 4) {
        this.divFirmantes = 4;
        this.divDestinatarios = 8;
        this.subDestinatarios = 3;
      }
      else if (numeroFirmantes >= 5) {
        this.divFirmantes = 2;
        this.divDestinatarios = 10;
        this.subDestinatarios = 3;
      }
    })
  }


  cancelarFirmante() {
    this.cat_firmanteService.cancelFirmante(this.id_gestion_oficios).subscribe(data => {
      if (data !== null) {
        const id_gestion_oficios = parseInt(this.id_gestion_oficios);
        this.banderaVerPanelFirmante = false;
        this.nuevoFirmanteComponent.cancelado();
      }
    })
  }

  ccp(id_cat_destinatario: number) {
    this._cat_destinatarioService.ccp_destinatario(id_cat_destinatario, this.id_gestion_oficios,).subscribe(data => {
      if (data == "1") {
        this.getInfoDestinatario(this.id_gestion_oficios);
      }
    });
  }

  cancelarDestinatario(id_cat_destinatario: number) {
    this._cat_destinatarioService.cancelar_destinatario(id_cat_destinatario, this.id_gestion_oficios).subscribe(data => {
      if (data == "1") {
        this.getInfoDestinatario(this.id_gestion_oficios);
      }
    });
  }

  toggleCopiaConocimiento(item: any) {
    const nuevoEstado = item.con_copia === 1 ? 0 : 1;

    this._cat_destinatarioService.ccp_destinatario(item.id_cat_destinatario, this.id_gestion_oficios)
      .subscribe(data => {
        if (data === "1") {
          item.con_copia = nuevoEstado; // Actualiza el estado local sin recargar toda la lista
        } else {
          console.warn("No se pudo actualizar el estado de con_copia");
        }
      });
  }



  //-------------------------------------------------------------------------------------------
  //Mensaje de Swal/--------------------------------------------------------->
  mensajeAlertaError(titulo: string) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: titulo,
      showConfirmButton: false,
      timer: 2000
    });
  }

  mensajeAlertaSuccess(titulo: string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: titulo,
      showConfirmButton: false,
      timer: 1500
    });
  }

}
//---------------------------------------------------------------------------->
//Modal
@Component({
  selector: 'nuevo-dialog',
  templateUrl: 'nuevo-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentExampleDialog { }
