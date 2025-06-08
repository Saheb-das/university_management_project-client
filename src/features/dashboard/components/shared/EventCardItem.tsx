// internal import
import { Badge } from "@/components/ui/badge";
import { truncateString, formatShortDate } from "@/utils/convertStr";

type EventsType = {
  eventImg: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventType: string;
};

function EventCardItem({
  eventImg,
  eventTitle,
  eventTime,
  eventDate,
  eventType,
}: EventsType) {
  return (
    <div className="w-full max-w-[500px] bg-background rounded-xl shadow-md hover:shadow-xl transition-all px-4 py-5 flex items-start gap-5">
      {/* Event Image */}
      <div className="w-[90px] h-[70px] md:w-[100px] md:h-[70px] lg:w-[110px] lg:h-[80px] flex-shrink-0 rounded-lg overflow-hidden bg-secondary">
        <img
          src={eventImg}
          alt="event image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Event Content */}
      <div className="flex-1 space-y-1">
        {/* Title */}
        <h3 className="text-lg font-semibold text-secondary-foreground leading-snug capitalize truncate max-w-[15ch]">
          {truncateString(eventTitle)}
        </h3>

        {/* Event Type */}
        <Badge variant="default" className="text-xs rounded-md px-2 py-0.5">
          {eventType}
        </Badge>

        {/* Date & Time */}
        <div className="flex justify-between text-xs text-muted-foreground pt-2">
          <span>{formatShortDate(eventDate)}</span>
          <span>{eventTime}</span>
        </div>
      </div>
    </div>
  );
}

// export
export default EventCardItem;
