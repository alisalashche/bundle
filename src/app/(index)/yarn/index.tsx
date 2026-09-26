import { AddButton } from '@/components/general-styled-components/buttons/add-button';
import { LinkButton } from '@/components/general-styled-components/buttons/grey-button';
import { Grid } from '@/components/general-styled-components/layout/cards/grid-card';
import { YarnCard } from '@/components/general-styled-components/layout/cards/yarn-card';
import { EmptyState } from '@/components/general-styled-components/layout/empty-state';
import { PageHeader, Section } from '@/components/general-styled-components/layout/layout-block';
import { Screen } from '@/components/general-styled-components/layout/screen';
import { Breadcrumbs } from '@/components/general-styled-components/navigation/breadcrumbs';
import { Heading } from '@/components/general-styled-components/typography';
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
                <EmptyState heading="Your stash is currently empty." actionLabel="Add yarn" onAction={addYarn} />
            ) : (
                <>
                    <AddButton label="Add new yarn" onPress={addYarn} />
                    <Section>
                        <Heading>Available yarn</Heading>
                        <Grid size='small'>
                            {available.map((yarn) => (
                                <YarnCard key={yarn.id} yarn={yarn} onPress={() => router.push(`/yarn/${yarn.id}`)} />
                            ))}
                        </Grid>
                    </Section>
                </>
            )}
            <LinkButton
                variant="add-link"
                icon="archivebox"
                label="See yarn archive →"
                onPress={() => router.push('/yarn/archive')}
            />
        </Screen>
    );
}