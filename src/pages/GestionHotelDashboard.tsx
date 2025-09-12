import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Users,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Bell,
  Search,
  Settings,
  Home,
  BarChart3,
  FileText,
  Calendar,
  MessageSquare,
  Download,
  RefreshCw,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Filter,
  Plus,
  ArrowUpDown,
  Bed,
  MapPin,
  Star,
  Clock,
  Wifi,
  Tv,
  Coffee,
  Car,
  Bath,
  Snowflake,
  Waves,
  Monitor,
  Phone,
  Wine,
  Sparkles,
  Droplets,
  Flame,
  Wind,
  ShieldCheck,
  GlassWater,
  Refrigerator,
  CloudRain,
  Usb,
  Bluetooth,
  Luggage,
  Mail,
  Users2,
  Baby,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Upload,
  X,
  Check,
  ArrowLeft,
  ArrowRight,
  Building,
  Camera,
  Info,
  User,
  XCircle,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DynamicIcon } from "@/components/DynamicIcon"
import { iconMap } from "@/modules"

// ===================== INTERFACES =====================
interface Habitacion {
  habitacion_id: number;
  numero_habitacion: string;
  estado: string;
  piso: number;
  vista: string;
  tipo_habitacion: {
    tipo_habitacion_id: number;
    nombre_tipo: string;
    descripcion: string;
    capacidad_maxima: number;
    precio_base_noche: string;
    resumen_camas: string;
  };
  imagenes: Array<{
    imagen_id: number;
    nombre_archivo: string;
    ruta_archivo: string;
    es_principal: number;
    orden_visualizacion: number;
  }>;
  comodidades: Array<{
    comodidad_id: number;
    nombre_comodidad: string;
    descripcion: string;
    categoria_comodidad: string;
    icono: {
      icon: string;
      text: string;
    };
  }>;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Habitacion[];
}

interface TipoHabitacion {
  tipo_habitacion_id: number;
  nombre_tipo: string;
  capacidad_maxima: number;
  precio_base_noche: string;
}

interface Vista {
  vista_id: number;
  nombre_vista: string;
  descripcion: string;
  precio_adicional: string;
  estado: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

interface Comodidad {
  comodidad_id: number;
  nombre_comodidad: string;
  descripcion: string;
  categoria_comodidad: string;
  icono?: {
    icon: string;
    text: string;
  };
}

interface FormData {
  numero_habitacion: string;
  tipo_habitacion_id: string;
  vista_id: string;
  piso: string;
  descripcion: string;
  estado: string;
  comodidades: number[];
  imagenes: File[];
}

interface StatsData {
  total: number;
  disponibles: number;
  ocupadas: number;
  mantenimiento: number;
}

// ===================== CONSTANTES =====================
// const iconMap: { [key: string]: any } = {
//   Wifi, Tv, Phone, Bluetooth, Usb, Coffee, Wine, GlassWater,
//   Refrigerator, Bath, Droplets, Waves, Sparkles, Snowflake,
//   Flame, Wind, Monitor, ShieldCheck, Luggage, Mail, Users2,
//   Baby, CloudRain, Calendar, Settings, Users
// };

const PISOS_DISPONIBLES = Array.from({ length: 10 }, (_, i) => i + 1);
const TOTAL_STEPS = 4;

// ===================== UTILIDADES =====================
const getStatusBadge = (estado: string) => {
  const badgeConfig = {
    "Disponible": {
      className: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
      dotColor: "bg-emerald-500",
      animate: true
    },
    "Ocupada": {
      className: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
      dotColor: "bg-red-500",
      animate: false
    },
    "Mantenimiento": {
      className: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
      dotColor: "bg-amber-500",
      animate: true
    }
  };

  const config = badgeConfig[estado as keyof typeof badgeConfig];

  if (!config) {
    return <Badge variant="outline" className="px-3 py-1.5">{estado}</Badge>;
  }

  return (
    <Badge variant="default" className={`${config.className} px-3 py-1.5 font-medium`}>
      <div className={`w-2 h-2 ${config.dotColor} rounded-full mr-2 ${config.animate ? 'animate-pulse' : ''}`}></div>
      {estado}
    </Badge>
  );
};

const calculateStats = (habitaciones: Habitacion[]): StatsData => ({
  total: habitaciones.length,
  disponibles: habitaciones.filter(h => h.estado === 'Disponible').length,
  ocupadas: habitaciones.filter(h => h.estado === 'Ocupada').length,
  mantenimiento: habitaciones.filter(h => h.estado === 'Mantenimiento').length,
});

const filterHabitaciones = (
  habitaciones: Habitacion[],
  busqueda: string,
  filtroEstado: string
): Habitacion[] => {
  return habitaciones.filter(habitacion => {
    const coincideBusqueda = habitacion.numero_habitacion.toLowerCase().includes(busqueda.toLowerCase()) ||
      habitacion.tipo_habitacion.nombre_tipo.toLowerCase().includes(busqueda.toLowerCase()) ||
      habitacion.vista.toLowerCase().includes(busqueda.toLowerCase());

    const coincideEstado = filtroEstado === "all" || habitacion.estado === filtroEstado;

    return coincideBusqueda && coincideEstado;
  });
};

// ===================== COMPONENTES DE UTILIDAD =====================
const ComodidadesList = ({ comodidades }: { comodidades: any[] }) => {
  const categorias = comodidades.reduce((acc, comodidad) => {
    if (!acc[comodidad.categoria_comodidad]) {
      acc[comodidad.categoria_comodidad] = [];
    }
    acc[comodidad.categoria_comodidad].push(comodidad);
    return acc;
  }, {} as { [key: string]: any[] });

  return (
    <div className="space-y-4">
      {Object.entries(categorias).map(([categoria, items]) => (
        <ComodidadCategory key={categoria} categoria={categoria} items={items} />
      ))}
    </div>
  );
};

const ComodidadCategory = ({ categoria, items }: { categoria: string; items: any[] }) => (
  <div className="space-y-2">
    <h4 className="font-semibold text-sm text-gray-700 uppercase tracking-wide">
      {categoria}
    </h4>
    <div className="grid grid-cols-2 gap-2">
      {items.map((comodidad) => (
        <ComodidadItem key={comodidad.comodidad_id} comodidad={comodidad} />
      ))}
    </div>
  </div>
);

const ComodidadItem = ({ comodidad }: { comodidad: any }) => {
  const IconComponent = iconMap[comodidad.icono?.icon] || Settings;

  return (
    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg text-xs">
      <IconComponent className="h-3 w-3 text-gray-600" />
      <span className="text-gray-700">{comodidad.nombre_comodidad}</span>
    </div>
  );
};


const ImageGallery = ({ imagenes }: { imagenes: any[] }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % imagenes.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + imagenes.length) % imagenes.length);

  if (!imagenes || imagenes.length === 0) {
    return <EmptyImagePlaceholder />;
  }

  return (
    <div className="relative">
      <ImageViewer
        imagenes={imagenes}
        currentImage={currentImage}
        onNext={nextImage}
        onPrev={prevImage}
      />
      {imagenes.length > 1 && (
        <ImageIndicators
          imagenes={imagenes}
          currentImage={currentImage}
          onSelect={setCurrentImage}
        />
      )}
    </div>
  );
};

const EmptyImagePlaceholder = () => (
  <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
    <ImageIcon className="h-12 w-12 text-gray-400" />
  </div>
);

const ImageViewer = ({
  imagenes,
  currentImage,
  onNext,
  onPrev
}: {
  imagenes: any[];
  currentImage: number;
  onNext: () => void;
  onPrev: () => void;
}) => (
  <div className="relative h-64 w-full overflow-hidden rounded-lg">
    <img
      src={imagenes[currentImage]?.ruta_archivo || "/placeholder-room.jpg"}
      alt={`Habitación imagen ${currentImage + 1}`}
      className="object-cover w-full h-full"
    />
    {imagenes.length > 1 && (
      <>
        <NavigationButton direction="left" onClick={onPrev} />
        <NavigationButton direction="right" onClick={onNext} />
      </>
    )}
  </div>
);

const NavigationButton = ({
  direction,
  onClick
}: {
  direction: 'left' | 'right';
  onClick: () => void;
}) => (
  <Button
    variant="ghost"
    size="icon"
    className={`absolute ${direction === 'left' ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70`}
    onClick={onClick}
  >
    {direction === 'left' ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
  </Button>
);

const ImageIndicators = ({
  imagenes,
  currentImage,
  onSelect
}: {
  imagenes: any[];
  currentImage: number;
  onSelect: (index: number) => void;
}) => (
  <div className="flex justify-center gap-2 mt-3">
    {imagenes.map((_, index) => (
      <button
        key={index}
        className={`w-2 h-2 rounded-full transition-colors ${index === currentImage ? 'bg-red-600' : 'bg-gray-300'
          }`}
        onClick={() => onSelect(index)}
      />
    ))}
  </div>
);

// ===================== COMPONENTES DEL MODAL =====================
const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  const progress = (currentStep / totalSteps) * 100;
  const stepLabels = ['Básica', 'Descripción', 'Comodidades', 'Imágenes'];

  return (
    <div className="space-y-2 mb-6">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Progreso</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-2" />

      <div className="flex justify-between mt-4">
        {[1, 2, 3, 4].map((step) => (
          <StepIndicatorItem
            key={step}
            step={step}
            currentStep={currentStep}
            label={stepLabels[step - 1]}
          />
        ))}
      </div>
    </div>
  );
};

const StepIndicatorItem = ({
  step,
  currentStep,
  label
}: {
  step: number;
  currentStep: number;
  label: string;
}) => {
  const getStepClass = () => {
    if (step < currentStep) return 'text-green-600';
    if (step === currentStep) return 'text-red-600';
    return 'text-gray-400';
  };

  const getCircleClass = () => {
    if (step < currentStep) return 'bg-green-100 text-green-600';
    if (step === currentStep) return 'bg-red-100 text-red-600';
    return 'bg-gray-100 text-gray-400';
  };

  return (
    <div className={`flex items-center ${getStepClass()}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${getCircleClass()}`}>
        {step < currentStep ? <Check className="h-4 w-4" /> : step}
      </div>
      <span className="ml-2 text-xs font-medium hidden sm:block">
        {label}
      </span>
    </div>
  );
};

const BasicInfoStep = ({
  formData,
  tiposHabitacion,
  vistas,
  onInputChange
}: {
  formData: FormData;
  tiposHabitacion: TipoHabitacion[];
  vistas: Vista[];
  onInputChange: (field: keyof FormData, value: any) => void;
}) => (
  <div className="space-y-6">
    <StepHeader
      icon={Building}
      title="Información Básica"
      description="Datos principales de la habitación"
    />

    <div className="grid grid-cols-2 gap-4">
      <InputField
        id="numero_habitacion"
        label="Número de Habitación *"
        value={formData.numero_habitacion}
        onChange={(value) => onInputChange('numero_habitacion', value)}
        placeholder="Ej: 101, 205, etc."
      />

      <SelectField
        label="Piso *"
        value={formData.piso}
        onValueChange={(value) => onInputChange('piso', value)}
        placeholder="Selecciona el piso"
        options={PISOS_DISPONIBLES.map(piso => ({
          value: piso.toString(),
          label: `Piso ${piso}`
        }))}
      />
    </div>

    <TipoHabitacionSelect
      value={formData.tipo_habitacion_id}
      onValueChange={(value) => onInputChange('tipo_habitacion_id', value)}
      tiposHabitacion={tiposHabitacion}
    />

    <VistaSelect
      value={formData.vista_id}
      onValueChange={(value) => onInputChange('vista_id', value)}
      vistas={vistas}
    />

    <EstadoSelect
      value={formData.estado}
      onValueChange={(value) => onInputChange('estado', value)}
    />
  </div>
);

const StepHeader = ({
  icon: Icon,
  title,
  description
}: {
  icon: any;
  title: string;
  description: string;
}) => (
  <div className="text-center mb-6">
    <Icon className="h-12 w-12 text-red-600 mx-auto mb-3" />
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const InputField = ({
  id,
  label,
  value,
  onChange,
  placeholder
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-12 focus:ring-red-500 focus:border-red-500"
    />
  </div>
);

const SelectField = ({
  label,
  value,
  onValueChange,
  placeholder,
  options
}: {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="h-12 focus:ring-red-500 focus:border-red-500">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const TipoHabitacionSelect = ({
  value,
  onValueChange,
  tiposHabitacion
}: {
  value: string;
  onValueChange: (value: string) => void;
  tiposHabitacion: TipoHabitacion[];
}) => (
  <div className="space-y-2">
    <Label>Tipo de Habitación *</Label>
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="h-12 focus:ring-red-500 focus:border-red-500">
        <SelectValue placeholder="Selecciona el tipo de habitación" />
      </SelectTrigger>
      <SelectContent>
        {tiposHabitacion.map((tipo) => (
          <SelectItem key={tipo.tipo_habitacion_id} value={tipo.tipo_habitacion_id.toString()}>
            <div className="flex flex-col">
              <span className="font-medium">{tipo.nombre_tipo}</span>
              <span className="text-xs text-gray-500">
                Máx. {tipo.capacidad_maxima} personas - ${parseFloat(tipo.precio_base_noche).toLocaleString()}/noche
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const VistaSelect = ({
  value,
  onValueChange,
  vistas
}: {
  value: string;
  onValueChange: (value: string) => void;
  vistas: Vista[];
}) => (
  <div className="space-y-2">
    <Label>Vista *</Label>
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="h-12 focus:ring-red-500 focus:border-red-500">
        <SelectValue placeholder="Selecciona la vista" />
      </SelectTrigger>
      <SelectContent>
        {vistas.filter(vista => vista.estado === 'Activo').map((vista) => (
          <SelectItem key={vista.vista_id} value={vista.vista_id.toString()}>
            <div className="flex flex-col">
              <span className="font-medium">{vista.nombre_vista}</span>
              <span className="text-xs text-gray-500">
                {vista.descripcion} {parseFloat(vista.precio_adicional) > 0 && `(+$${parseFloat(vista.precio_adicional).toLocaleString()})`}
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const EstadoSelect = ({
  value,
  onValueChange
}: {
  value: string;
  onValueChange: (value: string) => void;
}) => (
  <div className="space-y-2">
    <Label>Estado</Label>
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="h-12 focus:ring-red-500 focus:border-red-500">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Disponible">Disponible</SelectItem>
        <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
        <SelectItem value="Ocupada">Ocupada</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

const DescriptionStep = ({
  formData,
  tiposHabitacion,
  vistas,
  onInputChange
}: {
  formData: FormData;
  tiposHabitacion: TipoHabitacion[];
  vistas: Vista[];
  onInputChange: (field: keyof FormData, value: any) => void;
}) => (
  <div className="space-y-6">
    <StepHeader
      icon={FileText}
      title="Descripción"
      description="Información adicional sobre la habitación"
    />

    <div className="space-y-2">
      <Label htmlFor="descripcion">Descripción de la Habitación</Label>
      <Textarea
        id="descripcion"
        value={formData.descripcion}
        onChange={(e) => onInputChange('descripcion', e.target.value)}
        placeholder="Describe las características especiales de esta habitación..."
        rows={6}
        className="resize-none focus:ring-red-500 focus:border-red-500"
      />
      <p className="text-xs text-gray-500">
        Opcional: Agrega detalles que hagan única a esta habitación
      </p>
    </div>

    <SummaryCard
      formData={formData}
      tiposHabitacion={tiposHabitacion}
      vistas={vistas}
    />
  </div>
);

const SummaryCard = ({
  formData,
  tiposHabitacion,
  vistas
}: {
  formData: FormData;
  tiposHabitacion: TipoHabitacion[];
  vistas: Vista[];
}) => (
  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
    <h4 className="font-medium mb-3 text-red-900">Resumen de la habitación:</h4>
    <div className="grid grid-cols-2 gap-3 text-sm">
      <SummaryItem label="Número" value={formData.numero_habitacion || 'Sin especificar'} />
      <SummaryItem label="Piso" value={formData.piso || 'Sin especificar'} />
      <SummaryItem
        label="Tipo"
        value={tiposHabitacion.find(t => t.tipo_habitacion_id.toString() === formData.tipo_habitacion_id)?.nombre_tipo || 'Sin especificar'}
      />
      <SummaryItem
        label="Vista"
        value={vistas.find(v => v.vista_id.toString() === formData.vista_id)?.nombre_vista || 'Sin especificar'}
      />
    </div>
  </div>
);

const SummaryItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <span className="text-red-700">{label}:</span>
    <span className="ml-2 font-medium text-red-900">{value}</span>
  </div>
);

// ===================== MODAL PRINCIPAL =====================
const CrearHabitacionModal = ({ onHabitacionCreada }: { onHabitacionCreada: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Datos para los selects
  const [tiposHabitacion, setTiposHabitacion] = useState<TipoHabitacion[]>([]);
  const [vistas, setVistas] = useState<Vista[]>([]);
  const [comodidades, setComodidades] = useState<Comodidad[]>([]);

  // Form data
  const [formData, setFormData] = useState<FormData>({
    numero_habitacion: '',
    tipo_habitacion_id: '',
    vista_id: '',
    piso: '',
    descripcion: '',
    estado: 'Disponible',
    comodidades: [],
    imagenes: []
  });

  const [imagesPreviews, setImagesPreviews] = useState<string[]>([]);

  // Hooks personalizados para manejar la lógica
  const {
    cargarDatosIniciales,
    handleInputChange,
    toggleComodidad,
    handleImageChange,
    removeImage,
    validateStep,
    handleSubmit,
    resetForm
  } = useModalLogic({
    isOpen,
    formData,
    setFormData,
    setTiposHabitacion,
    setVistas,
    setComodidades,
    setImagesPreviews,
    setLoading,
    setError,
    setIsOpen,
    onHabitacionCreada
  });

  useEffect(() => {
    if (isOpen) {
      cargarDatosIniciales();
    }
  }, [isOpen, cargarDatosIniciales]);

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            formData={formData}
            tiposHabitacion={tiposHabitacion}
            vistas={vistas}
            onInputChange={handleInputChange}
          />
        );
      case 2:
        return (
          <DescriptionStep
            formData={formData}
            tiposHabitacion={tiposHabitacion}
            vistas={vistas}
            onInputChange={handleInputChange}
          />
        );
      case 3:
        return (
          <ComodidadesStep
            formData={formData}
            comodidades={comodidades}
            onToggleComodidad={toggleComodidad}
            onClearAll={() => setFormData(prev => ({ ...prev, comodidades: [] }))}
          />
        );
      case 4:
        return (
          <ImageStep
            formData={formData}
            imagesPreviews={imagesPreviews}
            tiposHabitacion={tiposHabitacion}
            vistas={vistas}
            onImageChange={handleImageChange}
            onRemoveImage={removeImage}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="default"
          className="h-11 px-6 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg text-white"
          onClick={() => setIsOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Habitación
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold">
            Crear Nueva Habitación
          </DialogTitle>
          <DialogDescription>
            Paso {currentStep} de {TOTAL_STEPS} - Completa la información para crear una nueva habitación
          </DialogDescription>
        </DialogHeader>

        <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        <div className="flex-1 overflow-y-auto max-h-96 mb-6">
          {renderStep()}
        </div>

        {error && <ErrorMessage error={error} />}

        <ModalNavigation
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          loading={loading}
          validateStep={validateStep}
          onPrevStep={prevStep}
          onNextStep={nextStep}
          onCancel={() => {
            setIsOpen(false);
            resetForm();
          }}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

// ===================== COMPONENTES ADICIONALES DEL MODAL =====================
const ComodidadesStep = ({
  formData,
  comodidades,
  onToggleComodidad,
  onClearAll
}: {
  formData: FormData;
  comodidades: Comodidad[];
  onToggleComodidad: (id: number) => void;
  onClearAll: () => void;
}) => {
  const comodidadesPorCategoria = comodidades.reduce((acc, comodidad) => {
    const categoria = comodidad.categoria_comodidad || 'Otras';
    if (!acc[categoria]) {
      acc[categoria] = [];
    }
    acc[categoria].push(comodidad);
    return acc;
  }, {} as { [key: string]: Comodidad[] });

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h3 className="text-2xl font-bold text-gray-900">Comodidades de la Habitación</h3>
        <p className="text-gray-600">
          Selecciona las comodidades disponibles en esta habitación
        </p>
      </div>

      <div className="space-y-6">
        {Object.entries(comodidadesPorCategoria).map(([categoria, comodidadesCategoria]) => (
          <ComodidadCategorySelector
            key={categoria}
            categoria={categoria}
            comodidades={comodidadesCategoria}
            selectedComodidades={formData.comodidades}
            onToggle={onToggleComodidad}
          />
        ))}
      </div>

      {formData.comodidades.length > 0 && (
        <SelectedComodidadesPanel
          selectedIds={formData.comodidades}
          comodidades={comodidades}
          onClearAll={onClearAll}
          onToggle={onToggleComodidad}
        />
      )}

      {formData.comodidades.length === 0 && <EmptyComodidadesMessage />}
    </div>
  );
};

const ComodidadCategorySelector = ({
  categoria,
  comodidades,
  selectedComodidades,
  onToggle
}: {
  categoria: string;
  comodidades: Comodidad[];
  selectedComodidades: number[];
  onToggle: (id: number) => void;
}) => (
  <div className="space-y-4">
    <h4 className="font-semibold text-lg text-gray-800 border-b pb-2">
      {categoria}
    </h4>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {comodidades.map((comodidad) => (
        <ComodidadCard
          key={comodidad.comodidad_id}
          comodidad={comodidad}
          isSelected={selectedComodidades.includes(comodidad.comodidad_id)}
          onToggle={() => onToggle(comodidad.comodidad_id)}
        />
      ))}
    </div>
  </div>
);

const ComodidadCard = ({
  comodidad,
  isSelected,
  onToggle
}: {
  comodidad: Comodidad;
  isSelected: boolean;
  onToggle: () => void;
}) => (
  <div
    onClick={onToggle}
    className={`
      relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:scale-105
      ${isSelected
        ? 'border-red-500 bg-red-50 shadow-lg'
        : 'border-gray-200 bg-white hover:border-red-300 hover:bg-red-50/50'
      }
    `}
  >
    <div className={`
      absolute top-2 right-2 w-5 h-5 rounded-full border-2 flex items-center justify-center
      ${isSelected
        ? 'border-red-500 bg-red-500'
        : 'border-gray-300 bg-white'
      }
    `}>
      {isSelected && <Check className="h-3 w-3 text-white" />}
    </div>

    <div className="flex flex-col items-center text-center space-y-2">
      <div className={`
        w-12 h-12 rounded-lg flex items-center justify-center
        ${isSelected ? 'bg-red-100' : 'bg-gray-100'}
      `}>
        <DynamicIcon
          name={comodidad?.icon || 'Settings'}
          className={`h-6 w-6 ${isSelected ? 'text-red-600' : 'text-gray-600'}`}
        />
      </div>

      <div>
        <p className={`text-sm font-medium ${isSelected ? 'text-red-900' : 'text-gray-900'}`}>
          {comodidad.nombre_comodidad}
        </p>
        {comodidad.descripcion && (
          <p className={`text-xs ${isSelected ? 'text-red-700' : 'text-gray-600'}`}>
            {comodidad.descripcion.length > 30
              ? `${comodidad.descripcion.substring(0, 30)}...`
              : comodidad.descripcion
            }
          </p>
        )}
      </div>
    </div>
  </div>
);

const SelectedComodidadesPanel = ({
  selectedIds,
  comodidades,
  onClearAll,
  onToggle
}: {
  selectedIds: number[];
  comodidades: Comodidad[];
  onClearAll: () => void;
  onToggle: (id: number) => void;
}) => (
  <div className="bg-red-50 rounded-lg p-6 border border-red-200">
    <div className="flex items-center justify-between mb-4">
      <h4 className="font-semibold text-red-900">
        Comodidades Seleccionadas ({selectedIds.length})
      </h4>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="text-red-600 hover:bg-red-100"
      >
        Limpiar todas
      </Button>
    </div>

    <div className="flex flex-wrap gap-2">
      {selectedIds.map(comodidadId => {
        const comodidad = comodidades.find(c => c.comodidad_id === comodidadId);
        if (!comodidad) return null;

        return (
          <Badge
            key={comodidadId}
            variant="secondary"
            className="bg-red-100 text-red-800 px-3 py-1 flex items-center gap-2"
          >
            <DynamicIcon
              name={comodidad?.icon || 'Settings'}
              className="h-3 w-3"
            />
            {comodidad.nombre_comodidad}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggle(comodidadId);
              }}
              className="ml-1 hover:bg-red-200 rounded-full p-0.5"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        );
      })}
    </div>
  </div>
);

const EmptyComodidadesMessage = () => (
  <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
    <Settings className="h-12 w-12 text-gray-400 mx-auto mb-3" />
    <p className="text-gray-600 font-medium">No hay comodidades seleccionadas</p>
    <p className="text-sm text-gray-500">Haz clic en las comodidades que deseas agregar</p>
  </div>
);

const ImageStep = ({
  formData,
  imagesPreviews,
  tiposHabitacion,
  vistas,
  onImageChange,
  onRemoveImage
}: {
  formData: FormData;
  imagesPreviews: string[];
  tiposHabitacion: TipoHabitacion[];
  vistas: Vista[];
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
}) => (
  <div className="space-y-6">
    <StepHeader
      icon={Camera}
      title="Imágenes"
      description="Sube fotos de la habitación"
    />

    <div className="space-y-4">
      <ImageUploadArea onImageChange={onImageChange} />

      {imagesPreviews.length > 0 && (
        <ImagePreviewGrid
          imagesPreviews={imagesPreviews}
          onRemoveImage={onRemoveImage}
        />
      )}
    </div>

    <FinalSummary
      formData={formData}
      tiposHabitacion={tiposHabitacion}
      vistas={vistas}
    />
  </div>
);

const ImageUploadArea = ({ onImageChange }: { onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-400 transition-colors">
    <input
      type="file"
      multiple
      accept="image/*"
      onChange={onImageChange}
      className="hidden"
      id="image-upload"
    />
    <label htmlFor="image-upload" className="cursor-pointer">
      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <p className="text-lg font-medium text-gray-700 mb-2">
        Arrastra imágenes aquí o haz clic para seleccionar
      </p>
      <p className="text-sm text-gray-500">
        PNG, JPG, JPEG hasta 10MB cada una
      </p>
    </label>
  </div>
);

const ImagePreviewGrid = ({
  imagesPreviews,
  onRemoveImage
}: {
  imagesPreviews: string[];
  onRemoveImage: (index: number) => void;
}) => (
  <div className="space-y-4">
    <h4 className="font-medium">Imágenes seleccionadas ({imagesPreviews.length})</h4>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {imagesPreviews.map((preview, index) => (
        <ImagePreviewItem
          key={index}
          preview={preview}
          index={index}
          onRemove={() => onRemoveImage(index)}
        />
      ))}
    </div>
    <p className="text-xs text-gray-500">
      La primera imagen será la imagen principal de la habitación
    </p>
  </div>
);

const ImagePreviewItem = ({
  preview,
  index,
  onRemove
}: {
  preview: string;
  index: number;
  onRemove: () => void;
}) => (
  <div className="relative group">
    <img
      src={preview}
      alt={`Preview ${index + 1}`}
      className="w-full h-32 object-cover rounded-lg border"
    />
    <button
      type="button"
      onClick={onRemove}
      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
    >
      <X className="h-4 w-4" />
    </button>
    {index === 0 && (
      <Badge className="absolute bottom-2 left-2 bg-red-600 text-white">
        Principal
      </Badge>
    )}
  </div>
);

const FinalSummary = ({
  formData,
  tiposHabitacion,
  vistas
}: {
  formData: FormData;
  tiposHabitacion: TipoHabitacion[];
  vistas: Vista[];
}) => (
  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
    <h4 className="font-semibold text-lg">Resumen Final</h4>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
      <div className="space-y-2">
        <SummaryRow label="Habitación" value={`#${formData.numero_habitacion}`} />
        <SummaryRow label="Piso" value={formData.piso} />
        <SummaryRow label="Estado" value={formData.estado} />
      </div>

      <div className="space-y-2">
        <SummaryRow
          label="Tipo"
          value={tiposHabitacion.find(t => t.tipo_habitacion_id.toString() === formData.tipo_habitacion_id)?.nombre_tipo || ''}
        />
        <SummaryRow
          label="Vista"
          value={vistas.find(v => v.vista_id.toString() === formData.vista_id)?.nombre_vista || ''}
        />
        <SummaryRow label="Comodidades" value={formData.comodidades.length.toString()} />
      </div>
    </div>

    <div className="flex justify-between pt-2 border-t">
      <span className="text-gray-600">Imágenes:</span>
      <span className="font-medium">{formData.imagenes.length} archivo(s)</span>
    </div>
  </div>
);

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between">
    <span className="text-gray-600">{label}:</span>
    <span className="font-medium">{value}</span>
  </div>
);

const ErrorMessage = ({ error }: { error: string }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <X className="h-5 w-5 text-red-400" />
      </div>
      <div className="ml-3">
        <p className="text-sm text-red-800">{error}</p>
      </div>
    </div>
  </div>
);

const ModalNavigation = ({
  currentStep,
  totalSteps,
  loading,
  validateStep,
  onPrevStep,
  onNextStep,
  onCancel,
  onSubmit
}: {
  currentStep: number;
  totalSteps: number;
  loading: boolean;
  validateStep: (step: number) => boolean;
  onPrevStep: () => void;
  onNextStep: () => void;
  onCancel: () => void;
  onSubmit: () => void;
}) => (
  <div className="flex items-center justify-between pt-6 border-t">
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        onClick={onPrevStep}
        disabled={currentStep === 1}
        className="h-11 px-6 border-red-200 text-red-600 hover:bg-red-50"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Anterior
      </Button>
    </div>

    <div className="flex items-center gap-3">
      <Button
        variant="ghost"
        onClick={onCancel}
        className="h-11 px-6 hover:bg-gray-100"
      >
        Cancelar
      </Button>

      {currentStep < totalSteps ? (
        <Button
          onClick={onNextStep}
          disabled={!validateStep(currentStep)}
          className="h-11 px-6 bg-red-600 hover:bg-red-700 text-white"
        >
          Siguiente
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      ) : (
        <Button
          onClick={onSubmit}
          disabled={loading || !validateStep(currentStep)}
          className="h-11 px-6 bg-green-600 hover:bg-green-700 text-white"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Creando...
            </>
          ) : (
            <>
              <Check className="h-4 w-4 mr-2" />
              Crear Habitación
            </>
          )}
        </Button>
      )}
    </div>
  </div>
);

// ===================== HOOK PERSONALIZADO PARA LA LÓGICA DEL MODAL =====================
const useModalLogic = ({
  isOpen,
  formData,
  setFormData,
  setTiposHabitacion,
  setVistas,
  setComodidades,
  setImagesPreviews,
  setLoading,
  setError,
  setIsOpen,
  onHabitacionCreada
}: any) => {
  const cargarDatosIniciales = async () => {
    try {
      const [tiposResponse, vistasResponse, comodidadesResponse] = await Promise.all([
        fetch('http://localhost:3000/api/tipoHabitacion'),
        fetch('http://localhost:3000/api/vistaHabitacion'),
        fetch('http://localhost:3000/api/comodidades')
      ]);

      if (tiposResponse.ok) {
        const tiposData = await tiposResponse.json();
        if (tiposData.success) {
          setTiposHabitacion(tiposData.data || []);
        }
      }

      if (vistasResponse.ok) {
        const vistasData = await vistasResponse.json();
        if (vistasData.success) {
          setVistas(vistasData.data || []);
        }
      }

      if (comodidadesResponse.ok) {
        const comodidadesData = await comodidadesResponse.json();
        if (comodidadesData.success) {
          setComodidades(comodidadesData.data || []);
        }
      }
    } catch (error) {
      console.error('Error cargando datos iniciales:', error);
    }
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev: FormData) => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleComodidad = (comodidadId: number) => {
    setFormData((prev: FormData) => ({
      ...prev,
      comodidades: prev.comodidades.includes(comodidadId)
        ? prev.comodidades.filter(id => id !== comodidadId)
        : [...prev.comodidades, comodidadId]
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev: FormData) => ({
      ...prev,
      imagenes: files
    }));

    const previews = files.map(file => URL.createObjectURL(file));
    setImagesPreviews(previews);
  };

  const removeImage = (index: number) => {
    const newImages = formData.imagenes.filter((_, i) => i !== index);
    setFormData((prev: FormData) => ({
      ...prev,
      imagenes: newImages
    }));

    setImagesPreviews((prev: string[]) => prev.filter((_, i) => i !== index));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.numero_habitacion && formData.tipo_habitacion_id && formData.vista_id && formData.piso);
      case 2:
      case 3:
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const formDataToSend = new FormData();
  
      // Agregar campos básicos (solo si tienen valor)
      const fieldsToSend = {
        numero_habitacion: formData.numero_habitacion,
        tipo_habitacion_id: formData.tipo_habitacion_id,
        vista_id: formData.vista_id,
        piso: formData.piso,
        descripcion: formData.descripcion,
        estado: formData.estado
      };
  
      // Solo enviar campos que tienen valor
      Object.entries(fieldsToSend).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value.toString().trim() !== '') {
          formDataToSend.append(key, value.toString());
        }
      });
  
      // Agregar comodidades como array
      if (formData.comodidades && formData.comodidades.length > 0) {
        formData.comodidades.forEach(comodidadId => {
          formDataToSend.append('comodidades', comodidadId.toString());
        });
      }
  
      // Agregar nuevas imágenes
      if (formData.imagenes && formData.imagenes.length > 0) {
        formData.imagenes.forEach(imagen => {
          formDataToSend.append('habitaciones', imagen);
        });
      }
  
      // Agregar IDs de imágenes que se mantienen
      if (existingImages && existingImages.length > 0) {
        const imagenesAMantener = existingImages.map(img => img.imagen_id);
        formDataToSend.append('imagenes_mantener', JSON.stringify(imagenesAMantener));
      }
  
      console.log('Enviando datos de actualización:', {
        habitacion_id: habitacion.habitacion_id,
        campos: Object.fromEntries(formDataToSend.entries()),
        comodidades: formData.comodidades,
        imagenes_nuevas: formData.imagenes.length,
        imagenes_mantener: existingImages.length
      });
  
      const response = await fetch(`http://localhost:3000/api/habitaciones/${habitacion.habitacion_id}`, {
        method: 'PUT',
        body: formDataToSend
      });
  
      const result = await response.json();
      console.log('Respuesta del servidor:', result);
  
      if (result.success) {
        setIsOpen(false);
        resetForm();
        onHabitacionActualizada();
        
        // Mostrar mensaje de éxito
        alert(`✅ Habitación actualizada exitosamente!\n\n` +
              `📊 Resumen:\n` +
              `• Campos actualizados: ${result.resumen.campos_actualizados}\n` +
              `• Comodidades: ${result.resumen.comodidades_asociadas}\n` +
              `• Imágenes totales: ${result.resumen.total_imagenes}\n` +
              `• Nuevas imágenes: ${result.resumen.imagenes_nuevas}`);
      } else {
        setError(result.message || 'Error al actualizar la habitación');
      }
    } catch (error) {
      setError('Error de conexión al actualizar la habitación');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const resetForm = () => {
    setFormData({
      numero_habitacion: '',
      tipo_habitacion_id: '',
      vista_id: '',
      piso: '',
      descripcion: '',
      estado: 'Disponible',
      comodidades: [],
      imagenes: []
    });
    setImagesPreviews([]);
    setError(null);
  };

  return {
    cargarDatosIniciales,
    handleInputChange,
    toggleComodidad,
    handleImageChange,
    removeImage,
    validateStep,
    handleSubmit,
    resetForm
  };
};

// ===================== COMPONENTES DEL DASHBOARD PRINCIPAL =====================
const DashboardHeader = ({
  busqueda,
  onBusquedaChange,
  reservas = []
}: {
  busqueda: string;
  onBusquedaChange: (value: string) => void;
  reservas?: any[];
}) => (
  <header className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-2xl border-b-4 border-red-800">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-20">
        <DashboardLogo />
        <DashboardActions busqueda={busqueda} onBusquedaChange={onBusquedaChange} reservas={reservas} />
      </div>
      
      {/* Barra de navegación secundaria */}
      <div className="border-t border-white/20 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-white/90">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">
                {new Date().toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-9 px-4 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 text-xs"
            >
              <RefreshCw className="h-3 w-3 mr-2" />
              Actualizar
            </Button>
          </div>
        </div>
      </div>
    </div>

    {/* Elementos decorativos */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
    </div>
  </header>
);

const DashboardLogo = () => (
  <div className="flex items-center space-x-4">
    <div className="relative">
      <div className="h-14 w-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-xl">
        <Bed className="h-8 w-8 text-white" />
      </div>
      <div className="absolute -top-1 -right-1 h-4 w-4 bg-yellow-400 rounded-full flex items-center justify-center">
        <div className="h-2 w-2 bg-yellow-600 rounded-full animate-pulse"></div>
      </div>
    </div>
    <div className="hidden sm:block">
      <h1 className="text-2xl lg:text-3xl font-bold text-white">
        Hotel Dashboard
      </h1>
      <p className="text-red-100 text-sm font-medium">
        Sistema de Gestión Hotelera • Reservas
      </p>
    </div>
  </div>
);

const DashboardStats = ({ reservas = [] }: { reservas: any[] }) => (
  <div className="hidden lg:flex items-center space-x-8">
    <div className="text-center">
      <div className="text-2xl font-bold text-white">{reservas.length}</div>
      <div className="text-xs text-red-100 uppercase tracking-wide">Total Reservas</div>
    </div>
    <div className="text-center">
      <div className="text-2xl font-bold text-yellow-300">
        {reservas.filter(r => r.estado_reserva?.toLowerCase() === 'pendiente').length}
      </div>
      <div className="text-xs text-red-100 uppercase tracking-wide">Pendientes</div>
    </div>
    <div className="text-center">
      <div className="text-2xl font-bold text-green-300">
        ${reservas.reduce((total, reserva) => total + (parseFloat(reserva.total_precio) || 0), 0).toLocaleString()}
      </div>
      <div className="text-xs text-red-100 uppercase tracking-wide">Ingresos</div>
    </div>
  </div>
);

const DashboardActions = ({
  busqueda,
  onBusquedaChange,
  reservas = []
}: {
  busqueda: string;
  onBusquedaChange: (value: string) => void;
  reservas?: any[];
}) => (
  <div className="flex items-center space-x-4">
    <SearchInput busqueda={busqueda} onBusquedaChange={onBusquedaChange} />
    <UserMenu />
  </div>
);

const SearchInput = ({
  busqueda,
  onBusquedaChange
}: {
  busqueda: string;
  onBusquedaChange: (value: string) => void;
}) => (
  <>
    {/* Versión desktop */}
    <div className="hidden md:block relative">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-red-300" />
      <input
        type="search"
        placeholder="Buscar Habitacion..."
        className="h-12 w-64 lg:w-80 rounded-2xl border-0 bg-white/10 backdrop-blur-sm pl-12 pr-4 text-white placeholder:text-red-200 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20 transition-all"
        value={busqueda}
        onChange={(e) => onBusquedaChange(e.target.value)}
      />
    </div>
    
    {/* Versión móvil */}
    <Button 
      variant="ghost" 
      size="icon" 
      className="md:hidden h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20"
    >
      <Search className="h-5 w-5" />
    </Button>
  </>
);

const NotificationButton = ({ reservas = [] }: { reservas: any[] }) => {
  const pendientes = reservas.filter(r => r.estado_reserva?.toLowerCase() === 'pendiente').length;
  
  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20"
      >
        <Bell className="h-5 w-5" />
      </Button>
      {pendientes > 0 && (
        <div className="absolute -top-2 -right-2 h-6 w-6 bg-yellow-400 rounded-full flex items-center justify-center">
          <span className="text-xs font-bold text-red-900">
            {pendientes}
          </span>
        </div>
      )}
    </div>
  );
};

const SettingsButton = () => (
  <Button 
    variant="ghost" 
    size="icon" 
    className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20"
  >
    <Settings className="h-5 w-5" />
  </Button>
);

const UserMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="relative h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 p-0">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/hotel-manager.jpg" />
          <AvatarFallback className="bg-gradient-to-br from-red-500 to-rose-600 text-white font-bold text-sm">
            HM
          </AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white"></div>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-56 mt-2 rounded-2xl shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <div className="px-4 py-3 border-b border-gray-100">
        <p className="text-sm font-semibold text-gray-900">Hotel Manager</p>
        <p className="text-xs text-gray-500">admin@hotel.com</p>
      </div>
      <DropdownMenuItem className="py-3 px-4 rounded-lg m-1">
        <User className="mr-3 h-4 w-4 text-gray-600" />
        Mi Perfil
      </DropdownMenuItem>
      <DropdownMenuItem className="py-3 px-4 rounded-lg m-1">
        <Settings className="mr-3 h-4 w-4 text-gray-600" />
        Configuración
      </DropdownMenuItem>
      <DropdownMenuSeparator className="my-1" />
      <DropdownMenuItem className="py-3 px-4 rounded-lg m-1 text-red-600">
        <XCircle className="mr-3 h-4 w-4" />
        Cerrar Sesión
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const Sidebar = ({ habitacionesCount }: { habitacionesCount: number }) => (
  <aside className="w-72 border-r bg-white/50 backdrop-blur-sm min-h-[calc(100vh-4rem)] shadow-sm">
    <nav className="p-6 space-y-2">
      <SidebarHeader />
      <SidebarNavigation habitacionesCount={habitacionesCount} />
    </nav>
  </aside>
);

const SidebarHeader = () => (
  <div className="mb-6">
    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
      Gestión Hotelera
    </h3>
  </div>
);

const SidebarNavigation = ({ habitacionesCount }: { habitacionesCount: number }) => {
  const navigationItems = [
    { icon: Bed, label: 'Habitaciones', active: true, badge: habitacionesCount },
    { icon: Calendar, label: 'Reservas', active: false },
    { icon: Users, label: 'Huéspedes', active: false },
    { icon: DollarSign, label: 'Facturación', active: false },
    { icon: BarChart3, label: 'Reportes', active: false },
    { icon: MessageSquare, label: 'Mensajes', active: false, indicator: true },
  ];

  return (
    <>
      {navigationItems.map((item, index) => (
        <SidebarNavItem key={index} {...item} />
      ))}

      <div className="pt-6">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Configuración
        </h3>
        <SidebarNavItem icon={Settings} label="Configuración" active={false} />
      </div>
    </>
  );
};

const SidebarNavItem = ({
  icon: Icon,
  label,
  active,
  badge,
  indicator
}: {
  icon: any;
  label: string;
  active: boolean;
  badge?: number;
  indicator?: boolean;
}) => (
  <Button
    variant="ghost"
    className={`w-full justify-start gap-3 h-12 px-4 rounded-xl transition-all duration-200 ${active
      ? 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
      : 'hover:bg-gray-100'
      }`}
  >
    <Icon className="h-4 w-4" />
    <span className="font-medium">{label}</span>
    {badge && (
      <Badge variant="secondary" className="ml-auto text-xs bg-red-100 text-red-800">
        {badge}
      </Badge>
    )}
    {indicator && (
      <div className="w-2 h-2 bg-green-500 rounded-full ml-auto animate-pulse"></div>
    )}
  </Button>
);

const StatsCards = ({ stats }: { stats: StatsData }) => {
  const statsConfig = [
    {
      title: 'Total Habitaciones',
      value: stats.total,
      icon: Bed,
      bgColor: 'from-red-50 to-red-100/50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700',
      valueColor: 'text-red-900',
      iconColor: 'text-red-600'
    },
    {
      title: 'Disponibles',
      value: stats.disponibles,
      icon: () => (
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        </div>
      ),
      bgColor: 'from-green-50 to-green-100/50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      valueColor: 'text-green-900',
      iconColor: 'text-green-600'
    },
    {
      title: 'Ocupadas',
      value: stats.ocupadas,
      icon: Users,
      bgColor: 'from-red-50 to-red-100/50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700',
      valueColor: 'text-red-900',
      iconColor: 'text-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {statsConfig.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

const StatCard = ({
  title,
  value,
  icon: Icon,
  bgColor,
  borderColor,
  textColor,
  valueColor,
  iconColor
}: {
  title: string;
  value: number;
  icon: any;
  bgColor: string;
  borderColor: string;
  textColor: string;
  valueColor: string;
  iconColor: string;
}) => (
  <Card className={`p-6 bg-gradient-to-br ${bgColor} ${borderColor}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className={`text-sm font-medium ${textColor}`}>{title}</p>
        <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
      </div>
      <Icon className={`h-8 w-8 ${iconColor}`} />
    </div>
  </Card>
);

const FilterSection = ({
  filtroEstado,
  onFiltroEstadoChange,
  onRefresh
}: {
  filtroEstado: string;
  onFiltroEstadoChange: (value: string) => void;
  onRefresh: () => void;
}) => (
  <CardHeader className="pb-6 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-t-lg">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Select value={filtroEstado} onValueChange={onFiltroEstadoChange}>
          <SelectTrigger className="w-48 h-12 rounded-xl focus:ring-red-500 focus:border-red-500">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="Disponible">Disponibles</SelectItem>
            <SelectItem value="Ocupada">Ocupadas</SelectItem>
            <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        variant="ghost"
        size="default"
        className="h-12 px-6 rounded-xl hover:bg-white/80"
        onClick={onRefresh}
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        Actualizar
      </Button>
    </div>
  </CardHeader>
);

const HabitacionesTable = ({
  habitaciones,
  busqueda,
  filtroEstado
}: {
  habitaciones: Habitacion[];
  busqueda: string;
  filtroEstado: string;
}) => {
  const habitacionesFiltradas = filterHabitaciones(habitaciones, busqueda, filtroEstado);

  return (
    <div className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-gray-50/50 bg-gray-50/30 border-b">
            {['Habitación', 'Detalles', 'Tipo y Precio', 'Estado', 'Vista', 'Acciones'].map((header) => (
              <TableHead key={header} className="py-6 px-8 font-semibold text-gray-700">
                {header === 'Acciones' ? (
                  <span className="text-right">{header}</span>
                ) : (
                  header
                )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {habitacionesFiltradas.map((habitacion) => (
            <HabitacionRow key={habitacion.habitacion_id} habitacion={habitacion} />
          ))}
        </TableBody>
      </Table>

      {habitacionesFiltradas.length === 0 && (
        <EmptyState busqueda={busqueda} filtroEstado={filtroEstado} />
      )}
    </div>
  );
};

const HabitacionRow = ({ habitacion }: { habitacion: Habitacion }) => (
  <TableRow className="hover:bg-red-50/50 transition-all duration-200 group border-b border-gray-100">
    <HabitacionCell habitacion={habitacion} />
    <DetallesCell habitacion={habitacion} />
    <PrecioCell habitacion={habitacion} />
    <EstadoCell estado={habitacion.estado} />
    <VistaCell vista={habitacion.vista} />
    <AccionesCell habitacion={habitacion} />
  </TableRow>
);

const HabitacionCell = ({ habitacion }: { habitacion: Habitacion }) => (
  <TableCell className="font-medium py-6 px-8">
    <div className="flex items-center gap-4">
      <div className="relative w-16 h-16 rounded-lg overflow-hidden shadow-sm">
        <img
          src={habitacion.imagenes[0]?.ruta_archivo || "/placeholder-room.jpg"}
          alt={`Habitación ${habitacion.numero_habitacion}`}
          className="object-cover w-full h-full"
        />
      </div>
      <div>
        <div className="font-bold text-lg text-gray-900">
          #{habitacion.numero_habitacion}
        </div>
        <div className="text-sm text-gray-600">
          Piso {habitacion.piso}
        </div>
      </div>
    </div>
  </TableCell>
);

const DetallesCell = ({ habitacion }: { habitacion: Habitacion }) => (
  <TableCell className="py-6 px-8">
    <div className="space-y-2">
      <div className="font-semibold text-gray-900">
        {habitacion.tipo_habitacion.nombre_tipo}
      </div>
      <div className="text-sm text-gray-600">
        <Bed className="w-4 h-4 inline mr-1" />
        {habitacion.tipo_habitacion.resumen_camas}
      </div>
      <div className="text-sm text-gray-600">
        <Users className="w-4 h-4 inline mr-1" />
        Máx. {habitacion.tipo_habitacion.capacidad_maxima} personas
      </div>
    </div>
  </TableCell>
);

const PrecioCell = ({ habitacion }: { habitacion: Habitacion }) => (
  <TableCell className="py-6 px-8">
    <div className="space-y-2">
      <div className="text-2xl font-bold text-green-600">
        ${parseFloat(habitacion.tipo_habitacion.precio_base_noche).toLocaleString()}
      </div>
      <div className="text-sm text-gray-600">por noche</div>
    </div>
  </TableCell>
);

const EstadoCell = ({ estado }: { estado: string }) => (
  <TableCell className="py-6 px-8">
    {getStatusBadge(estado)}
  </TableCell>
);

const VistaCell = ({ vista }: { vista: string }) => (
  <TableCell className="py-6 px-8">
    <div className="flex items-center gap-2 text-sm text-gray-700">
      <MapPin className="w-4 h-4 text-gray-400" />
      {vista}
    </div>
  </TableCell>
);

const AccionesCell = ({ habitacion }: { habitacion: Habitacion }) => (
  <TableCell className="text-right py-6 px-8">
    <div className="flex items-center gap-2 justify-end">
      <HabitacionDetailDialog habitacion={habitacion} />
      <HabitacionActionsMenu />
    </div>
  </TableCell>
);

const HabitacionDetailDialog = ({ 
  habitacion, 
  onHabitacionActualizada 
}: { 
  habitacion: Habitacion;
  onHabitacionActualizada?: () => void;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 px-3 rounded-lg hover:bg-red-100 opacity-0 group-hover:opacity-100 transition-all duration-200"
        >
          <Eye className="h-4 w-4 mr-1" />
          Ver Detalles
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] w-[95vw] max-h-[95vh] h-[95vh] p-0 overflow-hidden lg:max-w-7xl lg:w-[90vw] xl:max-w-[1400px]">
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 sm:p-6 pb-6 sm:pb-8">
          <DialogHeader className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 sm:p-3 rounded-full">
                  <Bed className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <div>
                  <DialogTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                    Habitación #{habitacion.numero_habitacion}
                  </DialogTitle>
                  <DialogDescription className="text-red-100 text-base sm:text-lg">
                    {habitacion.tipo_habitacion?.nombre_tipo || 'Tipo no especificado'}
                  </DialogDescription>
                </div>
              </div>

              {/* Badge de estado */}
              <div className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold self-start sm:self-auto ${
                habitacion.estado === 'Disponible'
                  ? 'bg-green-500 text-white'
                  : habitacion.estado === 'Ocupada'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-500 text-white'
              }`}>
                {habitacion.estado?.charAt(0).toUpperCase() + habitacion.estado?.slice(1)}
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Contenido scrolleable con altura calculada */}
        <div className="flex-1 overflow-y-auto" style={{ height: 'calc(95vh - 120px)' }}>
          <HabitacionDetailContent 
            habitacion={habitacion} 
            onHabitacionActualizada={onHabitacionActualizada}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
};


const HabitacionDetailContent = ({ 
  habitacion, 
  onHabitacionActualizada 
}: { 
  habitacion: Habitacion;
  onHabitacionActualizada?: () => void;
}) => {
  return (
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
      {/* Grid de información principal - Responsive */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Información básica */}
        <div className="xl:col-span-2 space-y-4 sm:space-y-6">
          <InfoCard
            title="Información General"
            icon={<Info className="h-5 w-5" />}
            content={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-3 sm:gap-4">
                <InfoItem label="Número" value={habitacion.numero_habitacion} />
                <InfoItem label="Tipo" value={habitacion.tipo_habitacion?.nombre_tipo} />
                <InfoItem label="Estado" value={habitacion.estado} />
                <InfoItem label="Piso" value={habitacion.piso} />
                <InfoItem label="Capacidad" value={`${habitacion.tipo_habitacion?.capacidad_maxima} personas`} />
                <InfoItem label="Precio por noche" value={`$${habitacion.tipo_habitacion?.precio_base_noche?.toLocaleString()}`} />
              </div>
            }
          />

          {/* Descripción */}
          {habitacion.descripcion && (
            <InfoCard
              title="Descripción"
              icon={<FileText className="h-5 w-5" />}
              content={
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {habitacion.descripcion}
                </p>
              }
            />
          )}

          {/* Comodidades */}
          {habitacion.comodidades && habitacion.comodidades.length > 0 && (
            <InfoCard
              title="Comodidades"
              icon={<Settings className="h-5 w-5" />}
              content={
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4 gap-2 sm:gap-3">
                  {habitacion.comodidades.map((comodidad) => (
                    <ComodidadBadge key={comodidad.comodidad_id} comodidad={comodidad} />
                  ))}
                </div>
              }
            />
          )}
        </div>

        {/* Panel lateral */}
        <div className="space-y-4 sm:space-y-6">
          {/* Estadísticas rápidas */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 sm:p-6 border border-red-200">
            <h3 className="font-semibold text-red-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
              <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
              Resumen
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <StatItem
                label="Capacidad"
                value={`${habitacion.tipo_habitacion?.capacidad_maxima} personas`}
                icon={<Users className="h-3 w-3 sm:h-4 sm:w-4" />}
              />
              <StatItem
                label="Precio/noche"
                value={`$${habitacion.tipo_habitacion?.precio_base_noche?.toLocaleString()}`}
                icon={<DollarSign className="h-3 w-3 sm:h-4 sm:w-4" />}
              />
              <StatItem
                label="Comodidades"
                value={`${habitacion.comodidades?.length || 0} disponibles`}
                icon={<Settings className="h-3 w-3 sm:h-4 sm:w-4" />}
              />
            </div>
          </div>

          {/* Información del tipo de habitación */}
          {habitacion.tipo_habitacion && (
            <InfoCard
              title="Detalles del Tipo"
              icon={<Bed className="h-5 w-5" />}
              content={
                <div className="space-y-2 sm:space-y-3">
                  {habitacion.tipo_habitacion.descripcion && (
                    <InfoItem
                      label="Descripción"
                      value={habitacion.tipo_habitacion.descripcion}
                    />
                  )}
                </div>
              }
            />
          )}

          {/* Acciones rápidas - AQUÍ ESTÁ EL BOTÓN DE EDITAR */}
          <div className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Acciones</h3>
            <div className="space-y-2">
              {/* Modal de edición desde los detalles */}
              <EditarHabitacionModal
                habitacion={habitacion}
                onHabitacionActualizada={onHabitacionActualizada || (() => {})}
                triggerButton={
                  <Button className="w-full text-xs sm:text-sm" size="sm">
                    <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    Editar Habitación
                  </Button>
                }
              />
              
              <Button variant="outline" className="w-full text-xs sm:text-sm" size="sm">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                Ver Reservas
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// Componentes auxiliares actualizados
const InfoCard = ({
  title,
  icon,
  content
}: {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}) => (
  <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
    <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
      {icon}
      {title}
    </h3>
    {content}
  </div>
);

const InfoItem = ({
  label,
  value
}: {
  label: string;
  value: string | number | undefined;
}) => (
  <div>
    <dt className="text-xs sm:text-sm font-medium text-gray-500">{label}</dt>
    <dd className="text-xs sm:text-sm text-gray-900 font-semibold">{value || 'No especificado'}</dd>
  </div>
);

const StatItem = ({
  label,
  value,
  icon
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2 text-red-700">
      {icon}
      <span className="text-xs sm:text-sm font-medium">{label}</span>
    </div>
    <span className="text-xs sm:text-sm font-semibold text-red-900">{value}</span>
  </div>
);

const ComodidadBadge = ({ comodidad }: { comodidad: any }) => {
  console.log(comodidad);

  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2 sm:p-3 border border-gray-200">
      <DynamicIcon
        name={comodidad.icono.icon || 'Wifi'}
        className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 flex-shrink-0"
      />
      <span className="text-xs sm:text-sm font-medium text-gray-900 truncate">
        {comodidad.nombre_comodidad}
      </span>
    </div>
  )
};


const HabitacionInfo = ({ habitacion }: { habitacion: Habitacion }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-4">
      <div className="text-3xl font-bold text-green-600">
        ${parseFloat(habitacion.tipo_habitacion.precio_base_noche).toLocaleString()}
      </div>
      <div className="text-sm text-gray-600">por noche</div>
    </div>
    <div className="grid grid-cols-2 gap-4 text-sm">
      <InfoItem icon={Users} text={`Máx. ${habitacion.tipo_habitacion.capacidad_maxima} personas`} />
      <InfoItem icon={Bed} text={habitacion.tipo_habitacion.resumen_camas} />
      <InfoItem icon={MapPin} text={habitacion.vista} />
      <InfoItem icon={Home} text={`Piso ${habitacion.piso}`} />
    </div>
    <div className="pt-2">
      {getStatusBadge(habitacion.estado)}
    </div>
  </div>
);



const HabitacionDescription = ({ descripcion }: { descripcion: string }) => (
  <div>
    <h4 className="font-semibold text-lg mb-3">Descripción</h4>
    <p className="text-sm text-gray-600 leading-relaxed max-h-32 overflow-y-auto">
      {descripcion}
    </p>
  </div>
);

const HabitacionComodidades = ({ comodidades }: { comodidades: any[] }) => (
  <div>
    <h4 className="font-semibold text-lg mb-3">
      Comodidades ({comodidades.length})
    </h4>
    <div className="max-h-64 overflow-y-auto">
      <ComodidadesList comodidades={comodidades} />
    </div>
  </div>
);

const HabitacionActions = () => (
  <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
    <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
      <Edit className="h-4 w-4 mr-2" />
      Editar Habitación
    </Button>
    <Button className="bg-red-600 hover:bg-red-700 text-white">
      <Calendar className="h-4 w-4 mr-2" />
      Ver Reservas
    </Button>
  </div>
);

const HabitacionActionsMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        size="sm"
        className="h-9 w-9 p-0 rounded-lg hover:bg-red-100 opacity-0 group-hover:opacity-100 transition-all duration-200"
      >
        <span className="sr-only">Abrir menú</span>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-56">
      <DropdownMenuItem className="py-3 px-4">
        <Calendar className="mr-3 h-4 w-4" />
        Ver calendario
      </DropdownMenuItem>
      <DropdownMenuItem className="py-3 px-4">
        <Edit className="mr-3 h-4 w-4" />
        Editar habitación
      </DropdownMenuItem>
      <DropdownMenuItem className="py-3 px-4">
        <Settings className="mr-3 h-4 w-4" />
        Cambiar estado
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-red-600 py-3 px-4">
        <Trash2 className="mr-3 h-4 w-4" />
        Eliminar habitación
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const EmptyState = ({
  busqueda,
  filtroEstado
}: {
  busqueda: string;
  filtroEstado: string;
}) => (
  <div className="text-center py-12">
    <Bed className="h-12 w-12 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron habitaciones</h3>
    <p className="text-gray-600 mb-4">
      {busqueda || filtroEstado !== "all"
        ? "Intenta ajustar tus filtros de búsqueda"
        : "No hay habitaciones registradas en el sistema"}
    </p>
    {(busqueda || filtroEstado !== "all") && (
      <ClearFiltersButton />
    )}
  </div>
);

const ClearFiltersButton = () => (
  <Button
    variant="outline"
    onClick={() => {
      // Esta función debería ser pasada como prop
      console.log("Limpiar filtros");
    }}
    className="border-red-200 text-red-600 hover:bg-red-50"
  >
    Limpiar filtros
  </Button>
);

const Pagination = ({ habitacionesCount }: { habitacionesCount: number }) => (
  <div className="flex items-center justify-between p-8 bg-gray-50/30 border-t">
    <div className="text-sm text-muted-foreground">
      Mostrando <span className="font-semibold text-gray-900">1-{habitacionesCount}</span> de{' '}
      <span className="font-semibold text-gray-900">{habitacionesCount}</span> habitaciones
    </div>
    <div className="flex items-center space-x-4">
      <Button variant="outline" size="sm" disabled className="h-10 px-6 rounded-xl">
        Anterior
      </Button>
      <div className="flex items-center space-x-2">
        <Button variant="default" size="sm" className="h-10 w-10 rounded-xl bg-red-600 text-white">
          1
        </Button>
      </div>
      <Button variant="outline" size="sm" disabled className="h-10 px-6 rounded-xl">
        Siguiente
      </Button>
    </div>
  </div>
);


const PopularComodidadesSection = ({ habitaciones }: { habitaciones: Habitacion[] }) => {
  const getTopComodidades = () => {
    const comodidadCount: { [key: string]: { count: number; icon: string } } = {};

    habitaciones.forEach(habitacion => {
      habitacion.comodidades.forEach(comodidad => {
        if (!comodidadCount[comodidad.nombre_comodidad]) {
          comodidadCount[comodidad.nombre_comodidad] = {
            count: 0,
            icon: comodidad.icono.icon
          };
        }
        comodidadCount[comodidad.nombre_comodidad].count++;
      });
    });

    return Object.entries(comodidadCount)
      .sort(([, a], [, b]) => b.count - a.count)
      .slice(0, 6);
  };

  const topComodidades = getTopComodidades();

  return (
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Comodidades Más Populares</CardTitle>
        <CardDescription>
          Las comodidades más frecuentes en nuestras habitaciones
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {topComodidades.map(([nombre, { count, icon }]) => (
            <PopularComodidadItem
              key={nombre}
              nombre={nombre}
              count={count}
              icon={icon}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const PopularComodidadItem = ({
  nombre,
  count,
  icon
}: {
  nombre: string;
  count: number;
  icon: string;
}) => {
  const IconComponent = iconMap[icon] || Settings;

  return (
    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-red-50 transition-colors cursor-pointer">
      <IconComponent className="h-8 w-8 text-red-600 mb-2" />
      <span className="text-sm font-medium text-center mb-1">{nombre}</span>
      <span className="text-xs text-gray-600">{count} habitaciones</span>
    </div>
  );
};

// ===================== COMPONENTE PRINCIPAL =====================
export const GestionHotelDashboard = () => {
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroEstado, setFiltroEstado] = useState<string>("all");
  const [busqueda, setBusqueda] = useState<string>("");

  const cargarHabitaciones = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/habitaciones');
      const data: ApiResponse = await response.json();

      if (data.success) {
        setHabitaciones(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Error al cargar las habitaciones');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarHabitaciones();
  }, []);

  const stats = calculateStats(habitaciones);
  const habitacionesFiltradas = filterHabitaciones(habitaciones, busqueda, filtroEstado);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} onRetry={cargarHabitaciones} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/50">
      <DashboardHeader busqueda={busqueda} onBusquedaChange={setBusqueda} />

      <div className="flex">
        <Sidebar habitacionesCount={habitaciones.length} />

        <main className="flex-1 p-8">
          <div className="space-y-8 max-w-7xl mx-auto">
            <MainHeader habitacionesCount={habitacionesFiltradas.length} onHabitacionCreada={cargarHabitaciones} />
            <StatsCards stats={stats} />

            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <FilterSection
                filtroEstado={filtroEstado}
                onFiltroEstadoChange={setFiltroEstado}
                onRefresh={cargarHabitaciones}
              />
              <CardContent className="p-0">
                <HabitacionesTable
                  habitaciones={habitaciones}
                  busqueda={busqueda}
                  filtroEstado={filtroEstado}
                />
                {habitacionesFiltradas.length > 0 && (
                  <Pagination habitacionesCount={habitacionesFiltradas.length} />
                )}
              </CardContent>
            </Card>

            <PopularComodidadesSection habitaciones={habitaciones} />
          </div>
        </main>
      </div>
    </div>
  );
};

const LoadingScreen = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Cargando habitaciones...</p>
    </div>
  </div>
);

const ErrorScreen = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/50 flex items-center justify-center">
    <div className="text-center">
      <p className="text-red-600 mb-4">{error}</p>
      <Button onClick={onRetry} className="bg-red-600 hover:bg-red-700 text-white">
        Reintentar
      </Button>
    </div>
  </div>
);

const MainHeader = ({
  habitacionesCount,
  onHabitacionCreada
}: {
  habitacionesCount: number;
  onHabitacionCreada: () => void;
}) => (
  <div className="flex items-center justify-between mb-8">
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <h2 className="text-4xl font-bold">
          Gestión de Habitaciones
        </h2>
        <Badge variant="outline" className="px-3 py-1">
          {habitacionesCount} habitaciones
        </Badge>
      </div>
      <p className="text-muted-foreground text-lg">
        Administra el inventario completo de habitaciones del hotel
      </p>
    </div>
    <div className="flex items-center gap-4">
      <CrearHabitacionModal onHabitacionCreada={onHabitacionCreada} />
    </div>
  </div>
);

// ===================== HOOKS PERSONALIZADOS ADICIONALES =====================
const useHabitaciones = () => {
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarHabitaciones = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:3000/api/habitaciones');
      const data: ApiResponse = await response.json();

      if (data.success) {
        setHabitaciones(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Error al cargar las habitaciones');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarHabitaciones();
  }, []);

  return {
    habitaciones,
    loading,
    error,
    cargarHabitaciones,
    setHabitaciones,
    setLoading,
    setError
  };
};

const useFilters = () => {
  const [filtroEstado, setFiltroEstado] = useState<string>("all");
  const [busqueda, setBusqueda] = useState<string>("");

  const clearFilters = () => {
    setFiltroEstado("all");
    setBusqueda("");
  };

  return {
    filtroEstado,
    setFiltroEstado,
    busqueda,
    setBusqueda,
    clearFilters
  };
};

// ===================== SERVICIOS API =====================
const habitacionesService = {
  async getAll(): Promise<ApiResponse> {
    const response = await fetch('http://localhost:3000/api/habitaciones');
    return response.json();
  },

  async create(formData: FormData): Promise<any> {
    const response = await fetch('http://localhost:3000/api/habitaciones', {
      method: 'POST',
      body: formData
    });
    return response.json();
  },

  async update(id: number, data: Partial<Habitacion>): Promise<any> {
    const response = await fetch(`http://localhost:3000/api/habitaciones/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  async delete(id: number): Promise<any> {
    const response = await fetch(`http://localhost:3000/api/habitaciones/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  }
};

const tiposHabitacionService = {
  async getAll(): Promise<any> {
    const response = await fetch('http://localhost:3000/api/tipoHabitacion');
    return response.json();
  }
};

const vistasService = {
  async getAll(): Promise<any> {
    const response = await fetch('http://localhost:3000/api/vistaHabitacion');
    return response.json();
  }
};

const comodidadesService = {
  async getAll(): Promise<any> {
    const response = await fetch('http://localhost:3000/api/comodidades');
    return response.json();
  }
};

// ===================== VALIDADORES =====================
const validationRules = {
  numero_habitacion: (value: string) => {
    if (!value.trim()) return 'El número de habitación es requerido';
    if (value.length < 2) return 'El número debe tener al menos 2 caracteres';
    return null;
  },

  tipo_habitacion_id: (value: string) => {
    if (!value) return 'Debe seleccionar un tipo de habitación';
    return null;
  },

  vista_id: (value: string) => {
    if (!value) return 'Debe seleccionar una vista';
    return null;
  },

  piso: (value: string) => {
    if (!value) return 'Debe seleccionar un piso';
    const pisoNum = parseInt(value);
    if (pisoNum < 1 || pisoNum > 10) return 'El piso debe estar entre 1 y 10';
    return null;
  }
};

const validateFormData = (formData: FormData, step: number): string | null => {
  switch (step) {
    case 1:
      return (
        validationRules.numero_habitacion(formData.numero_habitacion) ||
        validationRules.tipo_habitacion_id(formData.tipo_habitacion_id) ||
        validationRules.vista_id(formData.vista_id) ||
        validationRules.piso(formData.piso)
      );
    case 2:
    case 3:
    case 4:
      return null;
    default:
      return 'Paso inválido';
  }
};

// ===================== UTILIDADES DE FORMATO =====================
const formatters = {
  currency: (amount: string | number): string => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(num);
  },

  truncateText: (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  },

  capitalizeFirst: (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
};

// ===================== CONSTANTES DE CONFIGURACIÓN =====================
const CONFIG = {
  API_BASE_URL: 'http://localhost:3000/api',
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ACCEPTED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  MAX_IMAGES_PER_ROOM: 10,
  PAGINATION_SIZE: 10,
  DEBOUNCE_SEARCH_MS: 300
};

// ===================== TIPOS DE EVENTOS =====================
interface HabitacionEvent {
  type: 'created' | 'updated' | 'deleted';
  habitacion: Habitacion;
  timestamp: Date;
}

// ===================== CONTEXT PARA GESTIÓN GLOBAL =====================
interface HotelContextType {
  habitaciones: Habitacion[];
  loading: boolean;
  error: string | null;
  filters: {
    estado: string;
    busqueda: string;
  };
  actions: {
    cargarHabitaciones: () => Promise<void>;
    crearHabitacion: (data: FormData) => Promise<boolean>;
    actualizarHabitacion: (id: number, data: Partial<Habitacion>) => Promise<boolean>;
    eliminarHabitacion: (id: number) => Promise<boolean>;
    setFiltros: (filters: { estado?: string; busqueda?: string }) => void;
  };
}

// ===================== VERSIÓN REFACTORIZADA DEL COMPONENTE PRINCIPAL =====================
export const GestionHotelDashboardRefactored = () => {
  // Hooks personalizados
  const {
    habitaciones,
    loading,
    error,
    cargarHabitaciones
  } = useHabitaciones();

  const {
    filtroEstado,
    setFiltroEstado,
    busqueda,
    setBusqueda,
    clearFilters
  } = useFilters();

  // Datos computados
  const stats = calculateStats(habitaciones);
  const habitacionesFiltradas = filterHabitaciones(habitaciones, busqueda, filtroEstado);

  // Handlers
  const handleRefresh = () => {
    cargarHabitaciones();
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  const handleHabitacionCreated = () => {
    cargarHabitaciones();
  };

  // Estados de carga y error
  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} onRetry={cargarHabitaciones} />;
  }

  // Render principal
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/50">
      <DashboardHeader
        busqueda={busqueda}
        onBusquedaChange={setBusqueda}
      />

      <div className="flex">
        <Sidebar habitacionesCount={habitaciones.length} />

        <main className="flex-1 p-8">
          <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header principal */}
            <MainHeader
              habitacionesCount={habitacionesFiltradas.length}
              onHabitacionCreada={handleHabitacionCreated}
            />

            {/* Tarjetas de estadísticas */}
            <StatsCards stats={stats} />

            {/* Tabla principal */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <FilterSection
                filtroEstado={filtroEstado}
                onFiltroEstadoChange={setFiltroEstado}
                onRefresh={handleRefresh}
              />

              <CardContent className="p-0">
                <HabitacionesTableWithActions
                  habitaciones={habitaciones}
                  busqueda={busqueda}
                  filtroEstado={filtroEstado}
                  onClearFilters={handleClearFilters}
                />

                {habitacionesFiltradas.length > 0 && (
                  <Pagination habitacionesCount={habitacionesFiltradas.length} />
                )}
              </CardContent>
            </Card>

            {/* Secciones adicionales */}
            <QuickActionsSection onHabitacionCreada={handleHabitacionCreated} />
            <PopularComodidadesSection habitaciones={habitaciones} />
          </div>
        </main>
      </div>
    </div>
  );
};

// ===================== COMPONENTE DE TABLA CON ACCIONES =====================
const HabitacionesTableWithActions = ({
  habitaciones,
  busqueda,
  filtroEstado,
  onClearFilters
}: {
  habitaciones: Habitacion[];
  busqueda: string;
  filtroEstado: string;
  onClearFilters: () => void;
}) => {
  const habitacionesFiltradas = filterHabitaciones(habitaciones, busqueda, filtroEstado);

  return (
    <div className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-gray-50/50 bg-gray-50/30 border-b">
            {TABLE_HEADERS.map((header) => (
              <TableHead
                key={header.key}
                className={`py-6 px-8 font-semibold text-gray-700 ${header.align === 'right' ? 'text-right' : ''}`}
              >
                {header.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {habitacionesFiltradas.map((habitacion) => (
            <HabitacionRowWithActions
              key={habitacion.habitacion_id}
              habitacion={habitacion}
            />
          ))}
        </TableBody>
      </Table>

      {habitacionesFiltradas.length === 0 && (
        <EmptyStateWithActions
          busqueda={busqueda}
          filtroEstado={filtroEstado}
          onClearFilters={onClearFilters}
        />
      )}
    </div>
  );
};

// ===================== CONSTANTES PARA LA TABLA =====================
const TABLE_HEADERS = [
  { key: 'habitacion', label: 'Habitación', align: 'left' },
  { key: 'detalles', label: 'Detalles', align: 'left' },
  { key: 'precio', label: 'Tipo y Precio', align: 'left' },
  { key: 'estado', label: 'Estado', align: 'left' },
  { key: 'vista', label: 'Vista', align: 'left' },
  { key: 'acciones', label: 'Acciones', align: 'right' }
];

// ===================== COMPONENTE DE FILA CON ACCIONES =====================
const HabitacionRowWithActions = ({ habitacion }: { habitacion: Habitacion }) => (
  <TableRow className="hover:bg-red-50/50 transition-all duration-200 group border-b border-gray-100">
    <HabitacionCell habitacion={habitacion} />
    <DetallesCell habitacion={habitacion} />
    <PrecioCell habitacion={habitacion} />
    <EstadoCell estado={habitacion.estado} />
    <VistaCell vista={habitacion.vista} />
    <AccionesCellWithHandlers habitacion={habitacion} />
  </TableRow>
);

// ===================== CELDA DE ACCIONES INTEGRADA =====================
const AccionesCellWithHandlers = ({ habitacion }: { habitacion: Habitacion }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleHabitacionActualizada = () => {
    setRefreshTrigger(prev => prev + 1);
    // Recargar la página o actualizar el estado
    window.location.reload();
  };

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta habitación?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/habitaciones/${habitacion.habitacion_id}`, {
          method: 'DELETE'
        });

        const result = await response.json();

        if (result.success) {
          window.location.reload();
        } else {
          alert('Error al eliminar la habitación');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión');
      }
    }
  };

  return (
    <TableCell className="text-right py-6 px-8">
      <div className="flex items-center gap-2 justify-end">
        {/* Botón Ver Detalles */}
        <HabitacionDetailDialog 
          habitacion={habitacion} 
          onHabitacionActualizada={handleHabitacionActualizada}
        />

        {/* Modal de edición directo */}
        <EditarHabitacionModal
          habitacion={habitacion}
          onHabitacionActualizada={handleHabitacionActualizada}
        />

        {/* Menú de acciones adicionales */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 rounded-lg hover:bg-red-100 opacity-0 group-hover:opacity-100 transition-all duration-200"
            >
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem className="py-3 px-4">
              <Calendar className="mr-3 h-4 w-4" />
              Ver calendario
            </DropdownMenuItem>
            <DropdownMenuItem className="py-3 px-4">
              <Settings className="mr-3 h-4 w-4" />
              Cambiar estado
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 py-3 px-4" onClick={handleDelete}>
              <Trash2 className="mr-3 h-4 w-4" />
              Eliminar habitación
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </TableCell>
  );
};




// ===================== MENÚ DE ACCIONES CON HANDLERS =====================
const HabitacionActionsMenuWithHandlers = ({
  onEdit,
  onDelete,
  onViewCalendar,
  onChangeStatus
}: {
  onEdit: () => void;
  onDelete: () => void;
  onViewCalendar: () => void;
  onChangeStatus: () => void;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        size="sm"
        className="h-9 w-9 p-0 rounded-lg hover:bg-red-100 opacity-0 group-hover:opacity-100 transition-all duration-200"
      >
        <span className="sr-only">Abrir menú</span>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-56">
      <DropdownMenuItem className="py-3 px-4" onClick={onViewCalendar}>
        <Calendar className="mr-3 h-4 w-4" />
        Ver calendario
      </DropdownMenuItem>
      <DropdownMenuItem className="py-3 px-4" onClick={onEdit}>
        <Edit className="mr-3 h-4 w-4" />
        Editar habitación
      </DropdownMenuItem>
      <DropdownMenuItem className="py-3 px-4" onClick={onChangeStatus}>
        <Settings className="mr-3 h-4 w-4" />
        Cambiar estado
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-red-600 py-3 px-4" onClick={onDelete}>
        <Trash2 className="mr-3 h-4 w-4" />
        Eliminar habitación
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

// ===================== ESTADO VACÍO CON ACCIONES =====================
const EmptyStateWithActions = ({
  busqueda,
  filtroEstado,
  onClearFilters
}: {
  busqueda: string;
  filtroEstado: string;
  onClearFilters: () => void;
}) => (
  <div className="text-center py-12">
    <Bed className="h-12 w-12 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron habitaciones</h3>
    <p className="text-gray-600 mb-4">
      {busqueda || filtroEstado !== "all"
        ? "Intenta ajustar tus filtros de búsqueda"
        : "No hay habitaciones registradas en el sistema"}
    </p>
    {(busqueda || filtroEstado !== "all") && (
      <Button
        variant="outline"
        onClick={onClearFilters}
        className="border-red-200 text-red-600 hover:bg-red-50"
      >
        Limpiar filtros
      </Button>
    )}
  </div>
);

// Modal de Edición de Habitación

// ===================== MODAL DE EDICIÓN =====================
const EditarHabitacionModal = ({
  habitacion,
  onHabitacionActualizada,
  triggerButton
}: {
  habitacion: Habitacion;
  onHabitacionActualizada: () => void;
  triggerButton?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Datos para los selects
  const [tiposHabitacion, setTiposHabitacion] = useState<TipoHabitacion[]>([]);
  const [vistas, setVistas] = useState<Vista[]>([]);
  const [comodidades, setComodidades] = useState<Comodidad[]>([]);

  // Form data inicializado con los datos de la habitación
  const [formData, setFormData] = useState<FormData>({
    numero_habitacion: habitacion.numero_habitacion || '',
    tipo_habitacion_id: habitacion.tipo_habitacion?.tipo_habitacion_id?.toString() || '',
    vista_id: '', // Se llenará cuando carguemos las vistas
    piso: habitacion.piso?.toString() || '',
    descripcion: habitacion.descripcion || '',
    estado: habitacion.estado || 'Disponible',
    comodidades: habitacion.comodidades?.map(c => c.comodidad_id) || [],
    imagenes: []
  });

  const [imagesPreviews, setImagesPreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState(habitacion.imagenes || []);

  // Cargar datos iniciales
  const cargarDatosIniciales = async () => {
    try {
      const [tiposResponse, vistasResponse, comodidadesResponse] = await Promise.all([
        fetch('http://localhost:3000/api/tipoHabitacion'),
        fetch('http://localhost:3000/api/vistaHabitacion'),
        fetch('http://localhost:3000/api/comodidades')
      ]);

      if (tiposResponse.ok) {
        const tiposData = await tiposResponse.json();
        if (tiposData.success) {
          setTiposHabitacion(tiposData.data || []);
        }
      }

      if (vistasResponse.ok) {
        const vistasData = await vistasResponse.json();
        if (vistasData.success) {
          setVistas(vistasData.data || []);
          
          // Buscar la vista actual de la habitación
          const vistaActual = vistasData.data?.find((v: Vista) => 
            v.nombre_vista === habitacion.vista
          );
          
          if (vistaActual) {
            setFormData((prev: FormData) => ({
              ...prev,
              vista_id: vistaActual.vista_id.toString()
            }));
          }
        }
      }

      if (comodidadesResponse.ok) {
        const comodidadesData = await comodidadesResponse.json();
        if (comodidadesData.success) {
          setComodidades(comodidadesData.data || []);
        }
      }
    } catch (error) {
      console.error('Error cargando datos iniciales:', error);
    }
  };

  // Handlers
  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev: FormData) => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleComodidad = (comodidadId: number) => {
    setFormData((prev: FormData) => ({
      ...prev,
      comodidades: prev.comodidades.includes(comodidadId)
        ? prev.comodidades.filter(id => id !== comodidadId)
        : [...prev.comodidades, comodidadId]
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev: FormData) => ({
      ...prev,
      imagenes: [...prev.imagenes, ...files]
    }));

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagesPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    const newImages = formData.imagenes.filter((_, i) => i !== index);
    setFormData((prev: FormData) => ({
      ...prev,
      imagenes: newImages
    }));

    setImagesPreviews((prev: string[]) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev: any[]) => prev.filter((_, i) => i !== index));
  };

  const validateStep = (step: number): boolean => {
    return true; // Para edición, todos los campos son opcionales
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();

      // Solo agregar campos que tienen valor
      const fieldsToSend = {
        numero_habitacion: formData.numero_habitacion,
        tipo_habitacion_id: formData.tipo_habitacion_id,
        vista_id: formData.vista_id,
        piso: formData.piso,
        descripcion: formData.descripcion,
        estado: formData.estado
      };

      Object.entries(fieldsToSend).forEach(([key, value]) => {
        if (value && value.toString().trim() !== '') {
          formDataToSend.append(key, value.toString());
        }
      });

      // Agregar comodidades
      if (formData.comodidades.length > 0) {
        formData.comodidades.forEach(comodidadId => {
          formDataToSend.append('comodidades', comodidadId.toString());
        });
      }

      // Agregar nuevas imágenes
      formData.imagenes.forEach(imagen => {
        formDataToSend.append('habitaciones', imagen);
      });

      // Agregar IDs de imágenes existentes que se mantienen
      const imagenesAMantener = existingImages.map(img => img.imagen_id);
      if (imagenesAMantener.length > 0) {
        formDataToSend.append('imagenes_mantener', JSON.stringify(imagenesAMantener));
      }

      const response = await fetch(`http://localhost:3000/api/habitaciones/${habitacion.habitacion_id}`, {
        method: 'PUT',
        body: formDataToSend
      });

      const result = await response.json();

      if (result.success) {
        setIsOpen(false);
        resetForm();
        onHabitacionActualizada();
      } else {
        setError(result.message || 'Error al actualizar la habitación');
      }
    } catch (error) {
      setError('Error de conexión al actualizar la habitación');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      numero_habitacion: habitacion.numero_habitacion || '',
      tipo_habitacion_id: habitacion.tipo_habitacion?.tipo_habitacion_id?.toString() || '',
      vista_id: '',
      piso: habitacion.piso?.toString() || '',
      descripcion: habitacion.descripcion || '',
      estado: habitacion.estado || 'Disponible',
      comodidades: habitacion.comodidades?.map(c => c.comodidad_id) || [],
      imagenes: []
    });
    setImagesPreviews([]);
    setExistingImages(habitacion.imagenes || []);
    setError(null);
    setCurrentStep(1);
  };

  // Cargar datos cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      cargarDatosIniciales();
    }
  }, [isOpen]);

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            formData={formData}
            tiposHabitacion={tiposHabitacion}
            vistas={vistas}
            onInputChange={handleInputChange}
          />
        );
      case 2:
        return (
          <DescriptionStep
            formData={formData}
            tiposHabitacion={tiposHabitacion}
            vistas={vistas}
            onInputChange={handleInputChange}
          />
        );
      case 3:
        return (
          <ComodidadesStep
            formData={formData}
            comodidades={comodidades}
            onToggleComodidad={toggleComodidad}
            onClearAll={() => setFormData(prev => ({ ...prev, comodidades: [] }))}
          />
        );
      case 4:
        return (
          <EditImageStep
            formData={formData}
            imagesPreviews={imagesPreviews}
            existingImages={existingImages}
            tiposHabitacion={tiposHabitacion}
            vistas={vistas}
            onImageChange={handleImageChange}
            onRemoveImage={removeImage}
            onRemoveExistingImage={removeExistingImage}
          />
        );
      default:
        return null;
    }
  };

  // Botón trigger por defecto
  const defaultTrigger = (
    <Button
      variant="ghost"
      size="sm"
      className="h-9 px-3 rounded-lg hover:bg-blue-100 text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-200"
    >
      <Edit className="h-4 w-4 mr-1" />
      Editar
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || defaultTrigger}
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold">
            Editar Habitación #{habitacion.numero_habitacion}
          </DialogTitle>
          <DialogDescription>
            Paso {currentStep} de {TOTAL_STEPS} - Modifica la información de la habitación
          </DialogDescription>
        </DialogHeader>

        <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        <div className="flex-1 overflow-y-auto max-h-96 mb-6">
          {renderStep()}
        </div>

        {error && <ErrorMessage error={error} />}

        <EditModalNavigation
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          loading={loading}
          validateStep={validateStep}
          onPrevStep={prevStep}
          onNextStep={nextStep}
          onCancel={() => {
            setIsOpen(false);
            resetForm();
          }}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};


const EditImageStep = ({
  formData,
  imagesPreviews,
  existingImages,
  tiposHabitacion,
  vistas,
  onImageChange,
  onRemoveImage,
  onRemoveExistingImage
}: {
  formData: FormData;
  imagesPreviews: string[];
  existingImages: any[];
  tiposHabitacion: TipoHabitacion[];
  vistas: Vista[];
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
  onRemoveExistingImage: (index: number) => void;
}) => (
  <div className="space-y-6">
    <StepHeader
      icon={Camera}
      title="Gestionar Imágenes"
      description="Modifica las fotos de la habitación"
    />

    {/* Imágenes existentes */}
    {existingImages.length > 0 && (
      <div className="space-y-4">
        <h4 className="font-medium text-lg">Imágenes Actuales ({existingImages.length})</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {existingImages.map((imagen, index) => (
            <ExistingImagePreview
              key={imagen.imagen_id}
              imagen={imagen}
              index={index}
              onRemove={() => onRemoveExistingImage(index)}
            />
          ))}
        </div>
      </div>
    )}

    {/* Subir nuevas imágenes */}
    <div className="space-y-4">
      <h4 className="font-medium text-lg">Agregar Nuevas Imágenes</h4>
      <ImageUploadArea onImageChange={onImageChange} />

      {imagesPreviews.length > 0 && (
        <ImagePreviewGrid
          imagesPreviews={imagesPreviews}
          onRemoveImage={onRemoveImage}
        />
      )}
    </div>

    <FinalSummary
      formData={formData}
      tiposHabitacion={tiposHabitacion}
      vistas={vistas}
    />
  </div>
);

const ExistingImagePreview = ({
  imagen,
  index,
  onRemove
}: {
  imagen: any;
  index: number;
  onRemove: () => void;
}) => (
  <div className="relative group">
    <img
      src={imagen.ruta_archivo}
      alt={`Imagen ${index + 1}`}
      className="w-full h-32 object-cover rounded-lg border"
    />
    <button
      type="button"
      onClick={onRemove}
      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
    >
      <X className="h-4 w-4" />
    </button>
    {imagen.es_principal === 1 && (
      <Badge className="absolute bottom-2 left-2 bg-blue-600 text-white">
        Principal
      </Badge>
    )}
    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
      Actual
    </div>
  </div>
);
const useEditModalLogic = ({
  isOpen,
  habitacion,
  formData,
  setFormData,
  setTiposHabitacion,
  setVistas,
  setComodidades,
  setImagesPreviews,
  setExistingImages,
  existingImages,
  setLoading,
  setError,
  setIsOpen,
  onHabitacionActualizada
}: any) => {

  const cargarDatosIniciales = async () => {
    try {
      const [tiposResponse, vistasResponse, comodidadesResponse] = await Promise.all([
        fetch('http://localhost:3000/api/tipoHabitacion'),
        fetch('http://localhost:3000/api/vistaHabitacion'),
        fetch('http://localhost:3000/api/comodidades')
      ]);

      if (tiposResponse.ok) {
        const tiposData = await tiposResponse.json();
        if (tiposData.success) {
          setTiposHabitacion(tiposData.data || []);
        }
      }

      if (vistasResponse.ok) {
        const vistasData = await vistasResponse.json();
        if (vistasData.success) {
          setVistas(vistasData.data || []);

          // Buscar la vista actual de la habitación
          const vistaActual = vistasData.data?.find((v: Vista) =>
            v.nombre_vista === habitacion.vista
          );

          if (vistaActual) {
            setFormData((prev: FormData) => ({
              ...prev,
              vista_id: vistaActual.vista_id.toString()
            }));
          }
        }
      }

      if (comodidadesResponse.ok) {
        const comodidadesData = await comodidadesResponse.json();
        if (comodidadesData.success) {
          setComodidades(comodidadesData.data || []);
        }
      }
    } catch (error) {
      console.error('Error cargando datos iniciales:', error);
    }
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev: FormData) => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleComodidad = (comodidadId: number) => {
    setFormData((prev: FormData) => ({
      ...prev,
      comodidades: prev.comodidades.includes(comodidadId)
        ? prev.comodidades.filter(id => id !== comodidadId)
        : [...prev.comodidades, comodidadId]
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev: FormData) => ({
      ...prev,
      imagenes: [...prev.imagenes, ...files]
    }));

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagesPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    const newImages = formData.imagenes.filter((_, i) => i !== index);
    setFormData((prev: FormData) => ({
      ...prev,
      imagenes: newImages
    }));

    setImagesPreviews((prev: string[]) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev: any[]) => prev.filter((_, i) => i !== index));
  };

  const validateStep = (step: number): boolean => {
    // Para edición, todos los campos son opcionales
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();

      // Solo agregar campos que han sido modificados o que tienen valor
      const fieldsToSend = {
        numero_habitacion: formData.numero_habitacion,
        tipo_habitacion_id: formData.tipo_habitacion_id,
        vista_id: formData.vista_id,
        piso: formData.piso,
        descripcion: formData.descripcion,
        estado: formData.estado
      };

      Object.entries(fieldsToSend).forEach(([key, value]) => {
        if (value && value.toString().trim() !== '') {
          formDataToSend.append(key, value.toString());
        }
      });

      // Agregar comodidades solo si hay cambios
      if (formData.comodidades.length > 0) {
        formData.comodidades.forEach(comodidadId => {
          formDataToSend.append('comodidades', comodidadId.toString());
        });
      }

      // Agregar nuevas imágenes
      formData.imagenes.forEach(imagen => {
        formDataToSend.append('habitaciones', imagen);
      });

      // Agregar IDs de imágenes existentes que se mantienen
      const imagenesAMantener = existingImages.map(img => img.imagen_id);
      if (imagenesAMantener.length > 0) {
        formDataToSend.append('imagenes_mantener', JSON.stringify(imagenesAMantener));
      }

      const response = await fetch(`http://localhost:3000/api/habitaciones/${habitacion.habitacion_id}`, {
        method: 'PUT',
        body: formDataToSend
      });

      const result = await response.json();

      if (result.success) {
        setIsOpen(false);
        resetForm();
        onHabitacionActualizada();
      } else {
        setError(result.message || 'Error al actualizar la habitación');
      }
    } catch (error) {
      setError('Error de conexión al actualizar la habitación');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    // Resetear al estado inicial de la habitación
    setFormData({
      numero_habitacion: habitacion.numero_habitacion || '',
      tipo_habitacion_id: habitacion.tipo_habitacion?.tipo_habitacion_id?.toString() || '',
      vista_id: '',
      piso: habitacion.piso?.toString() || '',
      descripcion: habitacion.descripcion || '',
      estado: habitacion.estado || 'Disponible',
      comodidades: habitacion.comodidades?.map(c => c.comodidad_id) || [],
      imagenes: []
    });
    setImagesPreviews([]);
    setExistingImages(habitacion.imagenes || []);
    setError(null);
  };

  return {
    cargarDatosIniciales,
    handleInputChange,
    toggleComodidad,
    handleImageChange,
    removeImage,
    removeExistingImage,
    validateStep,
    handleSubmit,
    resetForm
  };
};
const EditModalNavigation = ({
  currentStep,
  totalSteps,
  loading,
  validateStep,
  onPrevStep,
  onNextStep,
  onCancel,
  onSubmit
}: {
  currentStep: number;
  totalSteps: number;
  loading: boolean;
  validateStep: (step: number) => boolean;
  onPrevStep: () => void;
  onNextStep: () => void;
  onCancel: () => void;
  onSubmit: () => void;
}) => (
  <div className="flex items-center justify-between pt-6 border-t">
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        onClick={onPrevStep}
        disabled={currentStep === 1}
        className="h-11 px-6 border-blue-200 text-blue-600 hover:bg-blue-50"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Anterior
      </Button>
    </div>

    <div className="flex items-center gap-3">
      <Button
        variant="ghost"
        onClick={onCancel}
        className="h-11 px-6 hover:bg-gray-100"
      >
        Cancelar
      </Button>

      {currentStep < totalSteps ? (
        <Button
          onClick={onNextStep}
          className="h-11 px-6 bg-blue-600 hover:bg-blue-700 text-white"
        >
          Siguiente
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      ) : (
        <Button
          onClick={onSubmit}
          disabled={loading}
          className="h-11 px-6 bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Actualizando...
            </>
          ) : (
            <>
              <Check className="h-4 w-4 mr-2" />
              Actualizar Habitación
            </>
          )}
        </Button>
      )}
    </div>
  </div>
);



