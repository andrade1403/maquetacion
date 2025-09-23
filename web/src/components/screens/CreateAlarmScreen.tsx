import React, { useState } from "react";
import { Switch } from "../ui/switch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { Check, Camera, Scan } from "lucide-react";
import {
  Medication,
  AlarmSettings,
  COLOR_PALETTE,
  ColorOption,
} from "../../types/medication";
import { ConfirmationModal } from "../ConfirmationModal";

interface CreateAlarmScreenProps {
  onSave: (medication: Partial<Medication>) => void;
  onBack: () => void;
}

export function CreateAlarmScreen({
  onSave,
  onBack,
}: CreateAlarmScreenProps) {
  const [medicationName, setMedicationName] = useState("");
  const [pillsPerBox, setPillsPerBox] = useState("30");
  const [selectedColor, setSelectedColor] =
    useState<ColorOption>(COLOR_PALETTE[0]);
  const [dose, setDose] = useState("1");
  const [selectedTime, setSelectedTime] = useState(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours =
      hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return {
      hour: displayHours.toString(),
      minute: minutes.toString().padStart(2, "0"),
      period: period,
    };
  });
  const [reminderType, setReminderType] = useState<
    "voice" | "sound" | "vibration"
  >("sound");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleTimeChange = (
    field: keyof AlarmSettings,
    value: string,
  ) => {
    setSelectedTime((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!medicationName.trim()) return;

    const timeString = `${selectedTime.hour}:${selectedTime.minute} ${selectedTime.period}`;

    const medicationData: Partial<Medication> = {
      name: medicationName.trim(),
      color: selectedColor.class,
      colorName: selectedColor.name,
      dose: `${dose} pastilla${parseInt(dose) > 1 ? "s" : ""}`,
      nextTime: timeString,
      nextDate: "Hoy",
      quantity: parseInt(pillsPerBox),
      totalQuantity: parseInt(pillsPerBox),
      pillsPerBox: parseInt(pillsPerBox),
      reminderType,
      image:
        "https://images.unsplash.com/photo-1632024894467-10dd0266ad92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTU4ODk2NTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    };

    setShowSuccessModal(true);
    // Delay the actual save to show the modal first
    setTimeout(() => {
      onSave(medicationData);
    }, 2000);
  };

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    onBack();
  };

  const isFormValid = medicationName.trim().length > 0;

  const [activo, setActivo] = useState(true);

  return (
    <div className="p-4 space-y-6">
      <div className="text-center py-4">
        <h1 className="text-2xl mb-2">Crear Nueva Alarma</h1>
        <p className="text-lg text-gray-600">
          Configura tu nuevo medicamento
        </p>
      </div>

      {/* Información del Medicamento */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            Información del Medicamento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-base text-gray-600 mt-2">
              Nombre del medicamento *
            </p>
            <Input
              id="medication-name"
              value={medicationName}
              onChange={(e) =>
                setMedicationName(e.target.value)
              }
              placeholder="Ej: Lisinopril 10mg"
              className="h-12 text-lg"
            />
          </div>

          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-4">
              <p className="text-base text-gray-600 mt-2">
                Pastillas por caja
              </p>
              <Input
                id="pills-per-box"
                type="number"
                value={pillsPerBox}
                onChange={(e) => setPillsPerBox(e.target.value)}
                placeholder="30"
                className="h-12 text-lg"
                min="1"
              />
            </div>
          </div>

          {/* Registro por foto/código de barras */}
          <div className="space-y-3">
            <Label className="text-lg">
              Registrar foto del medicamento
            </Label>
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                className="flex-1 h-12 text-base"
              >
                <Camera className="h-5 w-5 mr-2" />
                Nueva imagen
              </Button>
            </div>
          </div>

          {/* Selector de color mejorado */}
          <div>
            <Label className="text-lg mb-3 block">
              Color distintivo
            </Label>
            <div className="grid grid-cols-4 gap-3">
              {COLOR_PALETTE.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color)}
                  className={`
                    relative h-16 rounded-lg border-2 transition-all duration-200
                    ${color.class} ${color.border}
                    ${
                      selectedColor.id === color.id
                        ? "ring-2 ring-blue-500 ring-offset-2 scale-105"
                        : "hover:scale-105"
                    }
                  `}
                >
                  {selectedColor.id === color.id && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white rounded-full p-1">
                        <Check className="h-4 w-4 text-blue-600" />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
            <p className="text-base text-gray-600 mt-2">
              Seleccionado: {selectedColor.name}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Configuración de Alarma */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            Configuración de Alarma
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-base text-gray-600 mt-2">
              Cantidad a tomar
            </p>
            <div className="grid grid-cols-4">
              <Select value={dose} onValueChange={setDose}>
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem
                      key={num}
                      value={num.toString()}
                      className="text-lg py-3"
                    >
                      {num} pastilla{num > 1 ? "s" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Selector de hora AM/PM */}
          <div>
            <p className="text-base text-gray-600 mt-2">
              Hora del recordatorio
            </p>
            <div className="flex gap-2">
              <Select
                value={selectedTime.hour}
                onValueChange={(value) =>
                  handleTimeChange("hour", value)
                }
              >
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from(
                    { length: 12 },
                    (_, i) => i + 1,
                  ).map((hour) => (
                    <SelectItem
                      key={hour}
                      value={hour.toString()}
                      className="text-lg py-3"
                    >
                      {hour}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedTime.minute}
                onValueChange={(value) =>
                  handleTimeChange("minute", value)
                }
              >
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["00", "15", "30", "45"].map((minute) => (
                    <SelectItem
                      key={minute}
                      value={minute}
                      className="text-lg py-3"
                    >
                      {minute}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedTime.period}
                onValueChange={(value) =>
                  handleTimeChange(
                    "period",
                    value as "AM" | "PM",
                  )
                }
              >
                <SelectTrigger className="h-12 text-lg w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="AM"
                    className="text-lg py-3"
                  >
                    AM
                  </SelectItem>
                  <SelectItem
                    value="PM"
                    className="text-lg py-3"
                  >
                    PM
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-base text-gray-600 mt-2">
              Hora seleccionada: {selectedTime.hour}:
              {selectedTime.minute} {selectedTime.period}
            </p>
          </div>

          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-4">
              <p className="text-base text-gray-600 mt-2">
                Tipo de recordatorio
              </p>
              <Select
                value={reminderType}
                onValueChange={(value) =>
                  setReminderType(value as typeof reminderType)
                }
              >
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="sound"
                    className="text-lg py-3"
                  >
                    🔊 Sonido
                  </SelectItem>
                  <SelectItem
                    value="voice"
                    className="text-lg py-3"
                  >
                    🗣️ Voz
                  </SelectItem>
                  <SelectItem
                    value="vibration"
                    className="text-lg py-3"
                  >
                    📳 Vibración
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Switch
              className="scale-125"
              checked={activo}
              onCheckedChange={setActivo}
            />
            <p className="text-base text-gray-600">
              Recordatorio cada 5 minutos hasta que la confirmes
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Botones de acción */}
      <div className="flex gap-3 pt-4">
        <Button
          variant="outline"
          onClick={handleCancelClick}
          className="flex-1 h-12 text-lg bg-red-600 text-white hover:bg-red-700"
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          disabled={!isFormValid}
          className="flex-1 h-12 text-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          Guardar Alarma
        </Button>
      </div>

      {/* Modales */}
      <ConfirmationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        type="confirmation"
        title="¿Esta seguro que desea cancelar?"
        onConfirm={handleConfirmCancel}
      />

      <ConfirmationModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        type="info"
        title="Alarma creada Exitosamente"
      />
    </div>
  );
}