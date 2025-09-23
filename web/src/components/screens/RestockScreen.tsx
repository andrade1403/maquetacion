import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ImageWithFallback } from "../images/ImageWithFallback";
import { Package, Plus, Minus, Pill } from "lucide-react";
import { Medication } from "../../types/medication";
import { ConfirmationModal } from "../ConfirmationModal";

interface RestockScreenProps {
  medication: Medication | null;
  onSave: (medicationData: Partial<Medication>) => void;
  onBack: () => void;
}

export function RestockScreen({
  medication,
  onSave,
  onBack,
}: RestockScreenProps) {
  const [newBoxes, setNewBoxes] = useState(1);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  if (!medication) {
    return (
      <div className="p-4 text-center">
        <p className="text-lg text-gray-600">
          No se encontró el medicamento
        </p>
        <Button onClick={onBack} className="mt-4">
          Volver
        </Button>
      </div>
    );
  }

  const pillsToAdd = newBoxes * medication.pillsPerBox;
  const newTotal = medication.quantity + pillsToAdd;
  const currentPercentage =
    (medication.quantity / medication.totalQuantity) * 100;
  const newPercentage =
    (newTotal / (medication.totalQuantity + pillsToAdd)) * 100;

  const handleIncrement = () => {
    setNewBoxes((prev) => Math.min(prev + 1, 10)); // Máximo 10 cajas
  };

  const handleDecrement = () => {
    setNewBoxes((prev) => Math.max(prev - 1, 1)); // Mínimo 1 caja
  };

  const handleRestock = () => {
    const medicationData: Partial<Medication> = {
      quantity: newTotal,
      totalQuantity: medication.totalQuantity + pillsToAdd,
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

  return (
    <div className="p-4 space-y-6 border-gray-200">
      {/* Encabezado */}
      <div className="text-center py-4">
        <h1 className="text-2xl mb-2">Recargar Medicamento</h1>
        <p className="text-lg text-gray-600">
          Agrega nuevas cajas a tu inventario
        </p>
      </div>

      {/* Información del medicamento actual */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-xl">
            Medicamento a Recargar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 rounded-lg ${medication.color} flex items-center justify-center`}
            >
              <ImageWithFallback
                src={medication.image}
                alt={medication.name}
                className="w-12 h-12 rounded-md object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl mb-1">
                {medication.name}
              </h3>
              <p className="text-base text-gray-600 mb-2">
                {medication.colorName}
              </p>
              <div className="space-y-1">
                <p className="text-base">
                  <span className="font-medium">
                    Stock actual:
                  </span>{" "}
                  {medication.quantity} pastillas
                </p>
                <p className="text-base">
                  <span className="font-medium">
                    Pastillas por caja:
                  </span>{" "}
                  {medication.pillsPerBox}
                </p>
                <p
                  className={`text-base font-medium ${
                    currentPercentage <= 25
                      ? "text-red-600"
                      : currentPercentage <= 50
                        ? "text-yellow-600"
                        : "text-green-600"
                  }`}
                >
                  Estado: {Math.round(currentPercentage)}% del
                  inventario
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selector de cantidad */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            Cantidad a Agregar
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Selector de cajas */}
          <div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handleDecrement}
                disabled={newBoxes <= 1}
                className="h-12 w-12"
              >
                <Minus className="h-5 w-5" />
              </Button>

              <div className="flex-1 text-center">
                <div className="text-3xl font-bold text-600 mb-1">
                  {newBoxes}
                </div>
                <div className="text-base text-gray-600">
                  {newBoxes === 1 ? "caja" : "cajas"}
                </div>
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={handleIncrement}
                disabled={newBoxes >= 10}
                className="h-12 w-12"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </div>

          
        </CardContent>
      </Card>

      {/* Previsualización del resultado */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-xl">
            Resumen de Recarga
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-semibold text-600 mb-1">
                  +{pillsToAdd}
                </div>
                <div className="text-sm text-600">
                  Pastillas a agregar
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-600 mb-1">
                  {newTotal}
                </div>
                <div className="text-sm text-600">
                  Total después
                </div>
              </div>
            </div>

            {/* Comparación antes/después */}
            <div className="space-y-3 pt-4 border-t border-blue-200">
              <div className="flex justify-between items-center">
                <span className="text-base">Antes:</span>
                <span className="text-base font-medium">
                  {medication.quantity} pastillas (
                  {Math.round(currentPercentage)}%)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base">Después:</span>
                <span className="text-base font-medium text-600">
                  {newTotal} pastillas (100%)
                </span>
              </div>
            </div>

            {/* Estimación de duración */}
            <div className="p-3 bg-white/80 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                Con el nuevo stock tendrás aproximadamente{" "}
                <span className="font-medium text-600">
                  {Math.floor(
                    newTotal /
                      parseInt(
                        medication.dose.match(/\d+/)?.[0] ||
                          "1",
                      ),
                  )}{" "}
                  días
                </span>{" "}
                de medicamento
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botones de acción */}
      <div className="flex gap-3 pt-4">
        <Button
          onClick={handleCancelClick}
          className="flex-1 h-12 text-lg bg-red-600 text-white hover:bg-red-700"
        >
          Cancelar
        </Button>

        <Button
          onClick={handleRestock}
          className="flex-1 h-12 text-lg bg-blue-600 hover:bg-blue-700"
        >
          Confirmar Recarga
        </Button>
      </div>

      {/* Modales */}
      <ConfirmationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        type="confirmation"
        title="¿Esta seguro que desea cancelar la recarga?"
        onConfirm={handleConfirmCancel}
      />

      <ConfirmationModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        type="info"
        title="Medicamento recargado Exitosamente"
      />
    </div>
  );
}