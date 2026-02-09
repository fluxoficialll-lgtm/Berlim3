import { useEffect } from 'react';
// import { db } from '@/database';

type SubscriptionCallback = () => void;

export const useDatabaseSubscription = (table: string, callback: SubscriptionCallback) => {
  useEffect(() => {
    const unsubscribe = db.subscribe(table, callback);
    return () => {
      unsubscribe();
    };
  }, [table, callback, db]);
};
