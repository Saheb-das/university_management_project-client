type EventsType = {
  eventImg: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
};

function EventCardItem({
  eventImg,
  eventTitle,
  eventTime,
  eventDate,
}: EventsType) {
  return (
    <div className="list-view-card w-full max-w-md bg-background px-4 py-4 rounded-lg flex items-center gap-4 shadow-md hover:shadow-lg transition-all">
      {/* Event Image */}
      <div className="w-[90px] h-[60px] md:w-[100px] md:h-[70px] lg:w-[110px] lg:h-[80px] bg-secondary rounded-lg overflow-hidden">
        <img
          src={eventImg}
          alt="event image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Event Content */}
      <div className="flex-1">
        <h3 className="capitalize font-semibold text-secondary-foreground text-base leading-tight">
          {eventTitle}
        </h3>

        {/* Date & Time */}
        <div className="flex justify-between mt-3 text-sm text-muted-foreground">
          <p>{eventDate}</p>
          <p>{eventTime}</p>
        </div>
      </div>
    </div>
  );
}

// export
export default EventCardItem;
