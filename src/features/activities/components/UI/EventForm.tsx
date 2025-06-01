// external import
import { useState } from "react";
import { Calendar, Clock, MapPin, Link, ImageIcon, Plus } from "lucide-react";

// internal import
import { useCreateEvent } from "../../hooks/useCreateEvent";
import queryClient from "@/react-query/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

enum EventType {
  academic = "academic",
  cultural_festive = "cultural_festive",
  sports = "sports",
  technical = "technical",
  social_awareness = "social_awareness",
  alumni_networking = "alumni_networking",
  fun_informal = "fun_informal",
}

interface EventFormData {
  title: string;
  date: string;
  time: string;
  place: string;
  url: string;
  avatar: string;
  type: EventType;
}

export default function EventForm() {
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    date: "",
    time: "",
    place: "",
    url: "",
    avatar: "",
    type: EventType.academic,
  });

  const { mutate, isPending } = useCreateEvent();

  const [errors, setErrors] = useState<Partial<EventFormData>>({});

  const eventTypeOptions = [
    { value: EventType.academic, label: "Academic" },
    { value: EventType.cultural_festive, label: "Cultural & Festive" },
    { value: EventType.sports, label: "Sports" },
    { value: EventType.technical, label: "Technical" },
    { value: EventType.social_awareness, label: "Social Awareness" },
    { value: EventType.alumni_networking, label: "Alumni Networking" },
    { value: EventType.fun_informal, label: "Fun & Informal" },
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<EventFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (!formData.time) {
      newErrors.time = "Time is required";
    }

    if (!formData.place.trim()) {
      newErrors.place = "Place is required";
    }

    if (formData.url && !isValidUrl(formData.url)) {
      newErrors.url = "Please enter a valid URL";
    }

    if (formData.avatar && !isValidUrl(formData.avatar)) {
      newErrors.avatar = "Please enter a valid image URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleInputChange = (field: keyof EventFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    mutate(formData, {
      onSuccess: (res) => {
        if (!res) return res;

        if (res.success) {
          toast.success(res.message || "event creates successfully");

          queryClient.invalidateQueries({
            queryKey: ["upcoming-events"],
          });
        }
      },
      onError: (err) => {
        toast.error(err.message || "Failed to create event. Please try again.");
      },
      onSettled: () => {
        setFormData({
          title: "",
          date: "",
          time: "",
          place: "",
          url: "",
          avatar: "",
          type: EventType.academic,
        });
      },
    });
  };

  return (
    <div className="col-span-12 lg:col-span-7">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Event
          </CardTitle>
          <CardDescription>
            Fill in the details below to create a new event for your college.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Event Title *</Label>
              <Input
                id="title"
                placeholder="Enter event title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className={errors.date ? "border-red-500" : ""}
                />
                {errors.date && (
                  <p className="text-sm text-red-500">{errors.date}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Time *
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  className={errors.time ? "border-red-500" : ""}
                />
                {errors.time && (
                  <p className="text-sm text-red-500">{errors.time}</p>
                )}
              </div>
            </div>

            {/* Place */}
            <div className="space-y-2">
              <Label htmlFor="place" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Venue *
              </Label>
              <Input
                id="place"
                placeholder="Enter event venue"
                value={formData.place}
                onChange={(e) => handleInputChange("place", e.target.value)}
                className={errors.place ? "border-red-500" : ""}
              />
              {errors.place && (
                <p className="text-sm text-red-500">{errors.place}</p>
              )}
            </div>

            {/* Event Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Event Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleInputChange("type", value)}
              >
                <SelectTrigger
                  className={`w-full ${errors.type ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-sm text-red-500">{errors.type}</p>
              )}
            </div>

            {/* Optional Fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Optional Information</h3>

              {/* URL */}
              <div className="space-y-2">
                <Label htmlFor="url" className="flex items-center gap-2">
                  <Link className="h-4 w-4" />
                  Event URL
                </Label>
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com/event"
                  value={formData.url}
                  onChange={(e) => handleInputChange("url", e.target.value)}
                  className={errors.url ? "border-red-500" : ""}
                />
                {errors.url && (
                  <p className="text-sm text-red-500">{errors.url}</p>
                )}
              </div>

              {/* Avatar */}
              <div className="space-y-2">
                <Label htmlFor="avatar" className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Event Image URL
                </Label>
                <Input
                  id="avatar"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={formData.avatar}
                  onChange={(e) => handleInputChange("avatar", e.target.value)}
                  className={errors.avatar ? "border-red-500" : ""}
                />
                {errors.avatar && (
                  <p className="text-sm text-red-500">{errors.avatar}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <Button
                disabled={isPending}
                className="flex-1 cursor-pointer"
                type="submit"
              >
                {isPending ? "Creating Event..." : "Create Event"}
              </Button>
              <Button
                type="button"
                className="cursor-pointer"
                variant="outline"
                onClick={() => {
                  setFormData({
                    title: "",
                    date: "",
                    time: "",
                    place: "",
                    url: "",
                    avatar: "",
                    type: EventType.academic,
                  });
                  setErrors({});
                }}
              >
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
