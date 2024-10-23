import Link from 'next/link';
import { redirect } from 'next/navigation';

import { getSingleTour } from './api';

interface TourProps {
  params: {
    id: string;
  };
}

export const Tour = async ({ params }: TourProps) => {
  const tour = await getSingleTour({ id: params.id });

  if (!tour) {
    redirect('/tours');
  }

  const { city, country, currencySymbol, currency, flag, title, stops, description } = tour;

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="breadcrumbs text-sm mb-4">
        <ul>
          <li>
            <Link href="/tours">
              <span>Tours</span>
            </Link>
          </li>
          <li>
            <span>{title}</span>
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="max-w-2xl">
        <h1 className="text-4xl font-semibold mb-4">{title}</h1>

        <div className="card bg-base-100 shadow-xl mb-4">
          <div className="card-body">
            <h2 className="card-title">
              {city}, {country} {flag}
            </h2>

            <p className="text-sm">
              Currency: {currency} | {currencySymbol}
            </p>

            <div className="divider divider-accent">Description</div>

            <p className="leading-loose mb-6">{description}</p>

            <div className="divider divider-accent">Stops</div>
            <ul>
              {stops.map((stop, index) => (
                <li key={index} className="mb-4 bg-base-200 p-4 rounded-xl">
                  <p>• {stop}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
