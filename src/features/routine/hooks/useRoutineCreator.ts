import { useState } from "react";
import { days, IFormValues } from "../pages/RoutineCreator";
import { ILecture, ISchedule } from "../types/routine";
import { useCreateRoutine } from "./useCreateRoutine";
import { toast } from "sonner";

export const useRoutineCreator = () => {
  const [formData, setFormData] = useState<IFormValues>({
    batchId: "",
    semesterId: "",
    schedules: [],
  });

  const { mutate, isPending } = useCreateRoutine();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.batchId) {
      newErrors.batchId = "Batch is required";
    }

    if (!formData.semesterId) {
      newErrors.semesterId = "Semester is required";
    }

    if (formData.schedules.length === 0) {
      newErrors.schedules = "At least one schedule is required";
    }

    formData.schedules.forEach((schedule, scheduleIndex) => {
      if (!schedule.day) {
        newErrors[`schedules.${scheduleIndex}.day`] = "Day is required";
      }

      schedule.lectures.forEach((lecture, lectureIndex) => {
        if (!lecture.subject) {
          newErrors[
            `schedules.${scheduleIndex}.lectures.${lectureIndex}.subject`
          ] = "Subject is required";
        }
        if (!lecture.startTime) {
          newErrors[
            `schedules.${scheduleIndex}.lectures.${lectureIndex}.startTime`
          ] = "Start time is required";
        }
        if (!lecture.endTime) {
          newErrors[
            `schedules.${scheduleIndex}.lectures.${lectureIndex}.endTime`
          ] = "End time is required";
        }
        if (!lecture.room) {
          newErrors[
            `schedules.${scheduleIndex}.lectures.${lectureIndex}.room`
          ] = "Room is required";
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addSchedule = () => {
    const selectedDays = formData.schedules.map((s) => s.day);
    const remainingDays = days.filter((d) => !selectedDays.includes(d));

    if (remainingDays.length > 0) {
      setFormData((prev) => ({
        ...prev,
        schedules: [
          ...prev.schedules,
          { day: remainingDays[0], break: "", lectures: [] },
        ],
      }));
    }
  };

  const removeSchedule = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      schedules: prev.schedules.filter((_, i) => i !== index),
    }));
  };

  const updateSchedule = (
    index: number,
    field: keyof ISchedule,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      schedules: prev.schedules.map((schedule, i) =>
        i === index ? { ...schedule, [field]: value } : schedule
      ),
    }));
  };

  const addLecture = (scheduleIndex: number) => {
    const newLecture: ILecture = {
      subject: "",
      startTime: "",
      endTime: "",
      room: "",
    };
    setFormData((prev) => ({
      ...prev,
      schedules: prev.schedules.map((schedule, i) =>
        i === scheduleIndex
          ? { ...schedule, lectures: [...schedule.lectures, newLecture] }
          : schedule
      ),
    }));
  };

  const removeLecture = (scheduleIndex: number, lectureIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      schedules: prev.schedules.map((schedule, i) =>
        i === scheduleIndex
          ? {
              ...schedule,
              lectures: schedule.lectures.filter((_, j) => j !== lectureIndex),
            }
          : schedule
      ),
    }));
  };

  const updateLecture = (
    scheduleIndex: number,
    lectureIndex: number,
    field: keyof ILecture,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      schedules: prev.schedules.map((schedule, i) =>
        i === scheduleIndex
          ? {
              ...schedule,
              lectures: schedule.lectures.map((lecture, j) =>
                j === lectureIndex ? { ...lecture, [field]: value } : lecture
              ),
            }
          : schedule
      ),
    }));
  };

  const selectedDays = formData.schedules.map((s) => s.day);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Routine:", formData);
      // Here you would typically send the data to your backend
    }

    mutate(formData, {
      onSuccess: (res) => {
        if (!res) return res;

        toast.success(res.message || "routine created");
      },
      onError: (err) => {
        toast.error(err.message || "routine create failed");
      },
    });
  };

  return {
    formData,
    setFormData,
    addSchedule,
    removeSchedule,
    updateSchedule,
    addLecture,
    removeLecture,
    updateLecture,
    selectedDays,
    handleSubmit,
    errors,
    isPending,
  };
};
