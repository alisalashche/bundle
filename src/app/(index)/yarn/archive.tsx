import { router } from "expo-router";
import { Grid } from "@/components/general-styled-components/layout/cards/grid-card";
import { YarnCard } from "@/components/general-styled-components/layout/cards/yarn-card";
import { EmptyState } from "@/components/general-styled-components/layout/empty-state";
import { PageHeader, Section, MonthHeader } from "@/components/general-styled-components/layout/layout-block";
import { Breadcrumbs } from "@/components/general-styled-components/navigation/breadcrumbs";
import { Screen } from '@/components/general-styled-components/layout/screen';
import { Fragment } from "react/jsx-runtime";

import { useYarnStore } from '@/hooks/use-yarn-store';
import { groupByMonth } from "@/utils/dates";
import { confirmDelete } from "@/utils/yarn";

export default function YarnArchiveScreen() {

    const yarns = useYarnStore((state) => state.yarns);
    const archived = yarns.filter((yarn) => yarn.archived);
    const deleteYarn = useYarnStore((state) => state.deleteYarn);

    return (
        <Screen>
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Yarn', href: '/yarn' }, { label: 'Yarn archive' }]} />
            <PageHeader title="Yarn archive" description="All yarns that you already used." />
            <Section>
                {archived.length === 0 ? (
                    <EmptyState
                        heading="No yarn is archived"
                        text="Seems like you have not marked any of your yarns as used"
                    />
                ) : (
                    archived.map((yarn) => (
                        groupByMonth(archived, (yarn) => yarn.createdAt).map((group) => (
                            <Fragment key={group.title}>
                                <MonthHeader title={group.title} />
                                <Grid size='small'>
                                    {group.items.map((yarn) => (
                                        <YarnCard
                                            key={yarn.id}
                                            yarn={yarn}
                                            onPress={() => router.push(`/yarn/${yarn.id}`)}
                                            badgeIcon="trash.fill"
                                            onBadgePress={() => confirmDelete({ yarn, onConfirm: deleteYarn })}
                                        />
                                    ))}
                                </Grid>
                            </Fragment>
                        ))
                    )
                    )
                )}
            </Section>
        </Screen>
    );
}
