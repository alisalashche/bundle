import { Link, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useProjectStore } from '@/hooks/use-project-store';

export default function ProjectDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const project = useProjectStore((state) => state.projects.find((item) => item.id === id));
    const toggleStep = useProjectStore((state) => state.toggleStep);

    if (!project) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Text>Project not found</Text>
            </SafeAreaView>);
    }

    const doneSteps = project.steps.filter((step) => step.done).length;
    const progress = Math.round((doneSteps / project.steps.length) * 100);

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
            <ScrollView contentContainerStyle={{ padding: 18, gap: 24 }}>
                <Text>Logo</Text>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                    <Link href="/">Home</Link>
                    <Text>{'>'}</Text>
                    <Link href="/projects">Projects</Link>
                    <Text>{'>'}</Text>
                    <Text>{project.name}</Text>
                </View>

                <View>
                    <Text>{project.name}</Text>
                    <Text>{project.createdAt}</Text>
                </View>

                <View>
                    <Text>{progress}%</Text>
                    <Text>{project.status === 'active' ? 'Log progress' : 'Finished'}</Text>
                </View>

                <View>
                    <Text>Type: {project.craft === 'knitting' ? 'knitted' : 'crocheted'}</Text>
                    <Text>H/N size: {project.hookNeedleSize}</Text>
                    <Text>Stitches: {project.stitches}</Text>
                </View>

                <View>
                    <Text>Steps</Text>
                    {project.steps.map((step) => (
                        <Pressable key={step.id} onPress={() => toggleStep(project.id, step.id)}>
                            <Text>{step.done ? '[x]' : '[ ]'} {step.title}</Text>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}