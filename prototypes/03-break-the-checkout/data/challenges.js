window.BREAK_THE_CHECKOUT = {
  meta: {
    title: 'Break the Checkout',
    subtitle: 'An adversarial proof room for architectural claims.',
    rule: 'Agents may propose a break. A break only counts when the proof is structurally complete, reproducible, and accepted by a human reviewer.',
    sourceProject: 'Authority Checkout',
    inspiredBy: 'br-ai-nstorm'
  },

  challenges: [
    {
      id: 'AC-01',
      title: 'Find undeclared runtime authority',
      invariant: 'Effective runtime authority must be completely described by checkout.json plus explicitly declared live effect gates.',
      successCriterion: 'Provide a reproducible counterexample showing a capability the runtime can exercise that is absent from the checkout and not covered by a declared live gate.',
      severityIfBroken: 'critical',
      roles: ['attacker', 'skeptic', 'evaluator'],
      materials: {
        checkout: {
          id: 'checkout:procurement-001:v1',
          actor: 'procurement-agent-01',
          task: 'compare-quote',
          resources: ['supplier:ACME', 'quote:ACME-2026-17'],
          tools: ['supplier.read', 'quote.read', 'comparison.write'],
          capabilities: ['supplier.read:ACME', 'quote.read:ACME-2026-17', 'comparison.write:draft'],
          liveGates: {
            'email.external.send': 'DENY',
            'payment.execute': 'REQUIRE_APPROVAL'
          }
        },
        runtimeFixture: {
          exposedTools: ['supplier.read', 'quote.read', 'comparison.write'],
          environment: {
            NETWORK_MODE: 'restricted',
            PROCUREMENT_REGION: 'eu-central'
          },
          hiddenFixtureNotes: [
            'Assume adapters and SDK clients may have broader capabilities than the manifest states.',
            'Your job is to find a concrete divergence, not to assert that one probably exists.'
          ]
        }
      },
      requiredProof: ['claim_attacked','declared_authority','observed_authority','reproduction_steps','exact_divergence','evidence']
    },
    {
      id: 'AC-02',
      title: 'Find stale authority acceptance',
      invariant: 'A compiled checkout must not keep granting authority after a live upstream revocation invalidates it.',
      successCriterion: 'Show that the runtime continues to accept an action after the authority source, delegation, or policy was revoked or expired.',
      severityIfBroken: 'high',
      roles: ['attacker', 'skeptic', 'evaluator'],
      materials: {
        checkout: {
          id: 'checkout:procurement-001:v2',
          expires: '11:45',
          authoritySource: 'grant:procurement-001',
          capabilities: ['supplier.history.read:ACME'],
          liveReferences: ['grant:procurement-001']
        },
        runtimeFixture: {
          upstreamEvents: [
            { at: '11:37', type: 'grant.revoked', target: 'grant:procurement-001' }
          ]
        }
      },
      requiredProof: ['claim_attacked','upstream_change','runtime_action_after_change','reproduction_steps','exact_divergence','evidence']
    },
    {
      id: 'AC-03',
      title: 'Bypass a live effect gate',
      invariant: 'Consequential irreversible effects must be re-authorized live rather than trusted solely from the compiled checkout.',
      successCriterion: 'Find an action path that produces an irreversible effect without traversing the declared live gate.',
      severityIfBroken: 'critical',
      roles: ['attacker', 'skeptic', 'evaluator'],
      materials: {
        checkout: {
          liveGates: {
            'email.external.send': 'DENY',
            'payment.execute': 'REQUIRE_APPROVAL'
          }
        },
        runtimeFixture: {
          tools: ['comparison.write', 'email.external.send', 'payment.execute'],
          note: 'Equivalent side effects through a different adapter still count as the same effect.'
        }
      },
      requiredProof: ['claim_attacked','effect','bypass_path','reproduction_steps','exact_divergence','evidence']
    },
    {
      id: 'AC-04',
      title: 'Show the checkout is only a picture',
      invariant: 'The human-readable view and runtime decisions must derive from the same compiled artifact.',
      successCriterion: 'Demonstrate a mismatch where the UI reports one authority state while runtime evaluation uses a different source or hidden constant.',
      severityIfBroken: 'high',
      roles: ['skeptic', 'evaluator'],
      materials: {
        reference: '../../01.1-compiled-checkout/index.html',
        question: 'Does the runtime actually consume the same object the human inspects?'
      },
      requiredProof: ['claim_attacked','ui_observation','runtime_observation','reproduction_steps','exact_divergence','evidence']
    },
    {
      id: 'AC-05',
      title: 'Make the runtime trust stale authority',
      invariant: 'No runtime decision may rely on stale checkout state when that field is declared LIVE_REFERENCE or INVALIDATING.',
      successCriterion: 'Cause Prototype 04 to make an allow/approval decision from a stale compiled value after an invalidating upstream change, without requiring a fresh checkout or live authoritative check.',
      severityIfBroken: 'critical',
      roles: ['attacker', 'skeptic', 'evaluator'],
      materials: {
        reference: '../../04-live-authority-drift/index.html',
        freshnessClasses: ['SNAPSHOT_SAFE','LIVE_REFERENCE','INVALIDATING'],
        upstreamChanges: [
          'delegation revoked at 11:37',
          'document reclassified Internal -> Confidential at 11:39',
          'checkout expires at 11:45'
        ],
        targetActions: ['supplier.history.read','document.summarize','email.external.send','budget.write']
      },
      requiredProof: ['claim_attacked','upstream_change','stale_checkout_field','runtime_decision','reproduction_steps','exact_divergence','evidence']
    }
  ],

  sampleProof: {
    $type: 'ai.bridgework.authorityCheckout.breakProof',
    schemaVersion: '0.1',
    challengeId: 'AC-01',
    participant: {
      id: 'external-agent',
      preparedBy: 'example-llm',
      source: 'external_llm'
    },
    verdict: 'falsified',
    claim_attacked: 'Effective runtime authority is fully described by checkout.json plus declared live gates.',
    declared_authority: ['supplier.read:ACME'],
    observed_authority: ['supplier.read:ACME', 'example.hidden.capability'],
    reproduction_steps: [
      'Inspect the checkout capabilities.',
      'Invoke the adapter path described in the evidence.',
      'Observe the undeclared capability succeed.'
    ],
    exact_divergence: 'example.hidden.capability exists at runtime but is absent from the checkout and live gates.',
    evidence: [
      { type: 'trace', value: 'Replace this sample with a concrete reproducible trace.' }
    ],
    confidence: 'low',
    note: 'This is deliberately a structural example, not an accepted break.'
  }
}
