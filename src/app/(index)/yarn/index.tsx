import { AddCard } from '@/components/add-card';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { EmptyState } from '@/components/empty-state';
import { Grid } from '@/components/layout';
import { LinkRow } from '@/components/link-row';
import { PageHeader } from '@/components/page-header';
import { Screen } from '@/components/screen';
import { Heading } from '@/components/typography';
import { YarnCard } from '@/components/yarn-card';
import { useYarnStore } from '@/hooks/use-yarn-store';
import { router } from 'expo-router';

export default function YarnScreen() {
    const yarns = useYarnStore((state) => state.yarns);
    const available = yarns.filter((yarn) => !yarn.archived);
    const addYarn = () => router.push('/yarn/new');

    return (
        <Screen>
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Yarn' }]} />
            <PageHeader title="Yarn collection" description="Keep track of all yarns in your yarn stash" />

            {available.length === 0 ? (
                <EmptyState heading="Your stash is empty" actionLabel="Add yarn" onAction={addYarn} />
            ) : (
                <>
                    <AddCard label="Add new yarn" onPress={addYarn} />
                    <Heading>Available yarn</Heading>
                    <Grid>
                        {available.map((yarn) => (
                            <YarnCard key={yarn.id} yarn={yarn} onPress={() => router.push(`/yarn/${yarn.id}`)} />
                        ))}
                    </Grid>
                </>
            )}

            <LinkRow label="See yarn archive →" onPress={() => router.push('/yarn/archive')} />
        </Screen>
    );
}