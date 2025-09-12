"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
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
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Datos de ejemplo mejorados para la tabla
const data = [
  { 
    id: "1", 
    name: "John Doe", 
    email: "john@example.com", 
    status: "Active",
    role: "Admin",
    joinDate: "2024-01-15",
    avatar: "/avatars/john.jpg"
  },
  { 
    id: "2", 
    name: "Jane Smith", 
    email: "jane@example.com", 
    status: "Inactive",
    role: "User",
    joinDate: "2024-02-20",
    avatar: "/avatars/jane.jpg"
  },
  { 
    id: "3", 
    name: "Alice Johnson", 
    email: "alice@example.com", 
    status: "Active",
    role: "Manager",
    joinDate: "2024-03-10",
    avatar: "/avatars/alice.jpg"
  },
  { 
    id: "4", 
    name: "Bob Brown", 
    email: "bob@example.com", 
    status: "Pending",
    role: "User",
    joinDate: "2024-03-25",
    avatar: "/avatars/bob.jpg"
  },
  { 
    id: "5", 
    name: "Carol White", 
    email: "carol@example.com", 
    status: "Active",
    role: "Admin",
    joinDate: "2024-04-05",
    avatar: "/avatars/carol.jpg"
  },
];

// Función para obtener el color del badge según el estado
const getStatusBadge = (status: string) => {
  switch (status) {
    case "Active":
      return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1">Activo</Badge>
    case "Inactive":
      return <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-200 px-3 py-1">Inactivo</Badge>
    case "Pending":
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 px-3 py-1">Pendiente</Badge>
    default:
      return <Badge variant="outline" className="px-3 py-1">{status}</Badge>
  }
}

// Función para obtener el color del badge según el rol
const getRoleBadge = (role: string) => {
  switch (role) {
    case "Admin":
      return <Badge variant="default" className="bg-purple-100 text-purple-800 px-3 py-1">Admin</Badge>
    case "Manager":
      return <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-3 py-1">Manager</Badge>
    case "User":
      return <Badge variant="outline" className="px-3 py-1">Usuario</Badge>
    default:
      return <Badge variant="outline" className="px-3 py-1">{role}</Badge>
  }
}

// Componente principal del dashboard
export const GestionRestauranteDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between px-8">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-balance">Dashboard Pro</h1>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Buscar..."
                className="h-10 w-64 rounded-md border border-input bg-background pl-10 pr-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="h-9 w-9">
              <AvatarImage src="/diverse-user-avatars.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-sidebar min-h-[calc(100vh-4rem)]">
          <nav className="p-6 space-y-3">
            <Button variant="ghost" className="w-full justify-start gap-3 h-11 px-4 bg-sidebar-accent text-sidebar-accent-foreground">
              <Home className="h-4 w-4" />
              Inicio
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 h-11 px-4">
              <BarChart3 className="h-4 w-4" />
              Analíticas
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 h-11 px-4">
              <Users className="h-4 w-4" />
              Usuarios
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 h-11 px-4">
              <ShoppingCart className="h-4 w-4" />
              Ventas
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 h-11 px-4">
              <FileText className="h-4 w-4" />
              Reportes
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 h-11 px-4">
              <Calendar className="h-4 w-4" />
              Calendario
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 h-11 px-4">
              <MessageSquare className="h-4 w-4" />
              Mensajes
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 h-11 px-4">
              <Settings className="h-4 w-4" />
              Configuración
            </Button>
          </nav>
        </aside>

        {/* Contenido Principal */}
        <main className="flex-1 p-8">
          <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header de la tabla con título y acciones */}
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h2>
                <p className="text-muted-foreground text-lg">Administra y supervisa todos los usuarios del sistema</p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="default" className="h-10 px-6">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
                <Button size="default" className="h-10 px-6">
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Usuario
                </Button>
              </div>
            </div>

            {/* Filtros y búsqueda */}
            <Card className="shadow-sm py-4">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Buscar usuarios..."
                        className="pl-12 w-96 h-11"
                      />
                    </div>
                    <Button variant="outline" size="default" className="h-11 px-6">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtros
                    </Button>
                  </div>
                  <Button variant="ghost" size="default" className="h-11 px-6">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Actualizar
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="px-6 pb-6">
                {/* Tabla mejorada */}
                <div className="rounded-lg border shadow-sm overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-muted/50 bg-muted/30">
                        <TableHead className="w-[120px] py-4 px-6">
                          <Button variant="ghost" className="h-auto p-0 font-semibold text-left">
                            ID
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead className="py-4 px-6">
                          <Button variant="ghost" className="h-auto p-0 font-semibold text-left">
                            Usuario
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead className="py-4 px-6">
                          <Button variant="ghost" className="h-auto p-0 font-semibold text-left">
                            Email
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead className="py-4 px-6">
                          <Button variant="ghost" className="h-auto p-0 font-semibold text-left">
                            Rol
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead className="py-4 px-6">
                          <Button variant="ghost" className="h-auto p-0 font-semibold text-left">
                            Estado
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead className="py-4 px-6">
                          <Button variant="ghost" className="h-auto p-0 font-semibold text-left">
                            Fecha de Ingreso
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead className="text-right py-4 px-6">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.map((row, index) => (
                        <TableRow 
                          key={row.id} 
                          className="hover:bg-muted/50 transition-colors"
                          style={{ backgroundColor: index % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)' }}
                        >
                          <TableCell className="font-medium py-5 px-6">
                            <span className="text-sm font-mono bg-muted px-2 py-1 rounded">#{row.id}</span>
                          </TableCell>
                          <TableCell className="py-5 px-6">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                                <AvatarImage src={row.avatar} alt={row.name} />
                                <AvatarFallback className="text-sm font-medium">
                                  {row.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className="space-y-1">
                                <div className="font-medium text-sm">{row.name}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground py-5 px-6">
                            <span className="text-sm">{row.email}</span>
                          </TableCell>
                          <TableCell className="py-5 px-6">
                            {getRoleBadge(row.role)}
                          </TableCell>
                          <TableCell className="py-5 px-6">
                            {getStatusBadge(row.status)}
                          </TableCell>
                          <TableCell className="text-muted-foreground py-5 px-6">
                            <span className="text-sm">
                              {new Date(row.joinDate).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </TableCell>
                          <TableCell className="text-right py-5 px-6">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-9 w-9 p-0 hover:bg-muted">
                                  <span className="sr-only">Abrir menú</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem className="py-2 px-3">
                                  <Eye className="mr-3 h-4 w-4" />
                                  Ver detalles
                                </DropdownMenuItem>
                                <DropdownMenuItem className="py-2 px-3">
                                  <Edit className="mr-3 h-4 w-4" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600 py-2 px-3">
                                  <Trash2 className="mr-3 h-4 w-4" />
                                  Eliminar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Paginación */}
                <div className="flex items-center justify-between pt-6 mt-6 border-t">
                  <div className="text-sm text-muted-foreground">
                    Mostrando <span className="font-medium">1-5</span> de <span className="font-medium">100</span> resultados
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" size="sm" disabled className="h-9 px-4">
                      Anterior
                    </Button>
                    <div className="flex items-center space-x-1">
                      <Button variant="default" size="sm" className="h-9 w-9">
                        1
                      </Button>
                      <Button variant="outline" size="sm" className="h-9 w-9">
                        2
                      </Button>
                      <Button variant="outline" size="sm" className="h-9 w-9">
                        3
                      </Button>
                    </div>
                    <Button variant="outline" size="sm" className="h-9 px-4">
                      Siguiente
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
