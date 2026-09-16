import React from 'react';
import { useApp } from '../context/AppContext';
import { toBnNum } from '../utils/bilingual';
import { Armchair, Shield, Info } from 'lucide-react';

interface SeatSelectorProps {
  totalCapacity: number;
  alreadyBookedSeats?: string[];
  selectedSeats: string[];
  maxSeats: number;
  onSeatToggle: (seat: string) => void;
}

export const SeatSelector: React.FC<SeatSelectorProps> = ({
  totalCapacity,
  alreadyBookedSeats = [],
  selectedSeats,
  maxSeats,
  onSeatToggle
}) => {
  const { lang } = useApp();

  // Standard 36-passenger AC tourist coach layout: Rows A through I (4 seats each: 1, 2 [Aisle] 3, 4)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-stone-200">
        <div>
          <h4 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <Armchair className="w-5 h-5 text-amber-700" />
            <span>{lang === 'bn' ? 'বাসের আসন নির্বাচন করুন' : 'Select Your Bus Seats'}</span>
          </h4>
          <p className="text-xs text-stone-500 mt-0.5">
            {lang === 'bn'
              ? `আপনার মোট আসন সংখ্যা: ${toBnNum(maxSeats)} টি। পছন্দসই আসনে ক্লিক করুন।`
              : `Total passenger seats needed: ${maxSeats}. Click on seats to choose.`}
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded bg-white border border-stone-300"></span>
            <span className="text-stone-600">{lang === 'bn' ? 'উপলব্ধ' : 'Available'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded bg-amber-600 border border-amber-700"></span>
            <span className="text-stone-900 font-semibold">{lang === 'bn' ? 'নির্বাচিত' : 'Selected'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded bg-stone-300 border border-stone-400"></span>
            <span className="text-stone-400 line-through">{lang === 'bn' ? 'বুকড' : 'Booked'}</span>
          </div>
        </div>
      </div>

      {/* Bus Container */}
      <div className="mt-6 max-w-sm mx-auto bg-white rounded-3xl p-5 border-2 border-stone-300 shadow-md">
        {/* Front of Bus & Driver Area */}
        <div className="flex justify-between items-center pb-5 mb-5 border-b border-dashed border-stone-300 px-2">
          <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-widest flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-amber-600" />
            <span>{lang === 'bn' ? 'সামনের অংশ (Front)' : 'Front Windshield'}</span>
          </div>

          <div className="flex items-center gap-2 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200">
            <div className="w-4 h-4 rounded-full border-2 border-stone-600 border-t-transparent animate-spin-slow"></div>
            <span className="text-xs font-bold text-stone-700">
              {lang === 'bn' ? 'চালক (Driver)' : 'Driver'}
            </span>
          </div>
        </div>

        {/* Priority elderly row note */}
        <div className="mb-4 bg-amber-50/70 border border-amber-200/80 rounded-xl p-2.5 text-[11px] text-amber-900 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            {lang === 'bn'
              ? 'সারি A ও B প্রবীণ ও নারী তীর্থযাত্রীদের জন্য বিশেষ উপযোগী।'
              : 'Rows A & B are recommended for elderly and women pilgrims.'}
          </span>
        </div>

        {/* Coach Grid */}
        <div className="space-y-2.5">
          {rows.map((row) => {
            const seat1 = `${row}1`;
            const seat2 = `${row}2`;
            const seat3 = `${row}3`;
            const seat4 = `${row}4`;

            const renderSeat = (seatId: string) => {
              const isBooked = alreadyBookedSeats.includes(seatId);
              const isSelected = selectedSeats.includes(seatId);

              return (
                <button
                  key={seatId}
                  type="button"
                  disabled={isBooked}
                  onClick={() => onSeatToggle(seatId)}
                  className={`w-10 h-10 rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all ${
                    isBooked
                      ? 'bg-stone-200 text-stone-400 border border-stone-300 cursor-not-allowed'
                      : isSelected
                      ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-400 scale-105'
                      : 'bg-white hover:bg-amber-50 text-stone-700 border border-stone-300 hover:border-amber-400'
                  }`}
                  title={`${seatId} ${isBooked ? '(Booked)' : ''}`}
                >
                  <span>{lang === 'bn' ? toBnNum(seatId) : seatId}</span>
                </button>
              );
            };

            return (
              <div key={row} className="flex items-center justify-between px-2">
                {/* Left 2 seats */}
                <div className="flex gap-2">
                  {renderSeat(seat1)}
                  {renderSeat(seat2)}
                </div>

                {/* Aisle */}
                <div className="w-8 text-center text-[10px] font-mono text-stone-300">
                  |
                </div>

                {/* Right 2 seats */}
                <div className="flex gap-2">
                  {renderSeat(seat3)}
                  {renderSeat(seat4)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bus Rear */}
        <div className="mt-5 pt-3 border-t border-dashed border-stone-300 text-center text-[10px] text-stone-400 uppercase tracking-widest">
          {lang === 'bn' ? 'বাসের পেছনের অংশ (Rear)' : 'Rear Seats'}
        </div>
      </div>

      {/* Selected Feedback Bar */}
      <div className="mt-5 bg-white p-4 rounded-xl border border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="text-xs">
          <span className="text-stone-500 font-medium">
            {lang === 'bn' ? 'নির্বাচিত আসন: ' : 'Selected Seats: '}
          </span>
          <span className="font-bold text-amber-800 text-sm ml-1">
            {selectedSeats.length > 0 
              ? (lang === 'bn' ? selectedSeats.map(s => toBnNum(s)).join(', ') : selectedSeats.join(', '))
              : (lang === 'bn' ? 'কোনো আসন নির্বাচিত হয়নি' : 'None')}
          </span>
        </div>

        <div className="text-xs">
          {selectedSeats.length < maxSeats ? (
            <span className="text-amber-700 font-medium">
              {lang === 'bn'
                ? `আরো ${toBnNum(maxSeats - selectedSeats.length)} টি আসন নির্বাচন করুন`
                : `Select ${maxSeats - selectedSeats.length} more seat(s)`}
            </span>
          ) : (
            <span className="text-emerald-700 font-semibold">
              {lang === 'bn' ? '✓ সকল প্রয়োজনীয় আসন নির্বাচিত হয়েছে' : '✓ All required seats selected'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
