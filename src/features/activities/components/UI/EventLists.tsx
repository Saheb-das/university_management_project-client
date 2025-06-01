import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, ExternalLink, ImageIcon } from "lucide-react";
import { useRecoilValue } from "recoil";
import { eventsAtom } from "../../recoil/eventAtom";

enum EventType {
  academic = "academic",
  cultural_festive = "cultural_festive",
  sports = "sports",
  technical = "technical",
  social_awareness = "social_awareness",
  alumni_networking = "alumni_networking",
  fun_informal = "fun_informal",
}

const eventTypeLabels: Record<EventType, string> = {
  [EventType.academic]: "Academic",
  [EventType.cultural_festive]: "Cultural & Festive",
  [EventType.sports]: "Sports",
  [EventType.technical]: "Technical",
  [EventType.social_awareness]: "Social Awareness",
  [EventType.alumni_networking]: "Alumni Networking",
  [EventType.fun_informal]: "Fun & Informal",
};

const eventTypeColors: Record<EventType, string> = {
  [EventType.academic]: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  [EventType.cultural_festive]:
    "bg-purple-100 text-purple-800 hover:bg-purple-200",
  [EventType.sports]: "bg-green-100 text-green-800 hover:bg-green-200",
  [EventType.technical]: "bg-orange-100 text-orange-800 hover:bg-orange-200",
  [EventType.social_awareness]: "bg-red-100 text-red-800 hover:bg-red-200",
  [EventType.alumni_networking]:
    "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
  [EventType.fun_informal]: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(Number.parseInt(hours), Number.parseInt(minutes));
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const handleExternalLink = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

function EventList() {
  const events = useRecoilValue(eventsAtom);

  if (events.length === 0) {
    return (
      <div className="w-[200px] text-center py-12">
        <Calendar className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2  font-semibold text-gray-900">No events</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by creating a new event.
        </p>
      </div>
    );
  }

  return (
    <div className="col-span-5">
      <div className="col-span-12 lg:col-span-5">
        <Card className="w-full h-fit">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Events
              </CardTitle>
              <Badge variant="secondary" className="text-sm">
                {events.length} {events.length === 1 ? "Event" : "Events"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className=" max-h-[650px] overflow-y-auto">
            {events.length === 0 ? (
              <div className="text-center py-2">
                <Calendar className="mx-auto h-8 w-8 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">
                  No events
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Create your first event using the form.
                </p>
              </div>
            ) : (
              events.map((event) => (
                <Card
                  key={event.id}
                  className="overflow-hidden py-2 mb-3 hover:shadow-md transition-shadow duration-200"
                >
                  <CardContent className="p-0">
                    <div className="flex items-center">
                      {/* Image Section */}
                      <div className="relative w-16 h-16 bg-gray-100 flex-shrink-0">
                        {event.avatar ? (
                          <img
                            src={event.avatar || "/placeholder.svg"}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-50">
                            <ImageIcon className="h-4 w-4 text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 p-3 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            {/* Title and Type */}
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-sm font-semibold text-gray-900 truncate">
                                {event.title}
                              </h3>
                              <Badge
                                variant="secondary"
                                className={`text-xs flex-shrink-0 ${
                                  eventTypeColors[event.type]
                                }`}
                              >
                                {eventTypeLabels[event.type]}
                              </Badge>
                            </div>

                            {/* Event Details */}
                            <div className="space-y-1 text-xs text-gray-600">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3 text-gray-400" />
                                <span>{formatDate(event.date)}</span>
                                <Clock className="h-3 w-3 text-gray-400 ml-2" />
                                <span>{formatTime(event.time)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3 text-gray-400" />
                                <span className="truncate">{event.place}</span>

                                {/* External Link Button */}
                                {event.url && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleExternalLink(event.url!)
                                    }
                                    className="flex-shrink-0 h-6 w-6 p-0 hover:bg-gray-100"
                                    title="Open event link"
                                  >
                                    <ExternalLink className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default EventList;
