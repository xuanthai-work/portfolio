"use client";

import { useCallback, useState } from "react";

import { ArchitectureCard } from "@/components/architecture/ArchitectureCard";
import { ArchitectureModal } from "@/components/architecture/ArchitectureModal";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { architectures } from "@/data/architectures";
import { sectionContent } from "@/data/content";
import type { ArchitectureItem } from "@/types";

export function ArchitectureSection() {
  const [selected, setSelected] = useState<ArchitectureItem | null>(null);
  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <section
      className="scroll-mt-20 bg-[var(--surface-muted)] py-20 sm:py-24"
      id="architecture"
    >
      <Container>
        <SectionHeading {...sectionContent.architecture} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-[1.25fr_0.875fr_0.875fr]">
          {architectures.map((item, index) => (
            <Reveal delay={index * 0.05} key={item.id}>
              <ArchitectureCard item={item} onOpen={setSelected} />
            </Reveal>
          ))}
        </div>
      </Container>
      <ArchitectureModal item={selected} onClose={closeModal} />
    </section>
  );
}
