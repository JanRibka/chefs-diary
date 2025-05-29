import { Suspense } from 'react';

import PageContentSection from '@/components/admin/pageContentSection/PageContentSection';
import UnitGroupsTable from '@/components/admin/unitGroupsTable/UnitGroupsTable';
import {
    UnitGroupsTableContextProvider
} from '@/components/admin/unitGroupsTable/UnitGroupsTableContext';
import Spinner from '@/components/shared/spinner/Spinner';
import { getAllUnitGroups } from '@/lib/services/webDataService';

export default async function UnitGroupsPage() {
  const dataPromise = getAllUnitGroups();

  return (
    <PageContentSection className="flex-1">
      <UnitGroupsTableContextProvider>
        {/* <Suspense
          fallback={
            <Spinner
              aria-label="Loading..."
              color="primary"
              classNames={{
                circle1: "w-28 h-28",
                circle2: "w-28 h-28",
                wrapper: "w-28 h-28",
              }}
            />
          }
        > */}
        <UnitGroupsTable dataPromise={dataPromise} />
        {/* </Suspense> */}
      </UnitGroupsTableContextProvider>
    </PageContentSection>
  );
}
