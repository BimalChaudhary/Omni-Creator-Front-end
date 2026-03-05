import { patientService } from "@/src/services/patient/patient.services";
import { Patient, UpdatePatient } from "@/src/types/patient/patient.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Get All
export const usePatients = () => {
  return useQuery({
    queryKey: ["patients"],
    queryFn: () => patientService.getAll(),
  });
};

// Get By Id

export const usePatient = (id?: string) => {
  return useQuery({
    queryKey: ["Patients", id],
    queryFn: () => patientService.getById(id),
  });
};

// Create
export const usePatientCreate = () => {
  const querClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Patient) => patientService.create(data),
    onSuccess: () => {
      querClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
};

// Update

export const useUpdatePatient = (id?:string)=>{
    const querClient = useQueryClient()
    return useMutation({
        mutationFn: (data:UpdatePatient) => patientService.update(id,data),
        onSuccess: ()=>{
             querClient.invalidateQueries({queryKey: ['patients']})
             querClient.invalidateQueries({queryKey: ['patients',id]})
        }
    })
}

// Delete

export const useDeletePatient = (id?:string)=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ()=> patientService.delete(id),
        onSuccess: ()=> {
            queryClient.invalidateQueries({queryKey:['patients',id]})
        }
    })
}