export const data =
  [
    {
      applicationId: 12341234,
      title: "Tedison Inc",
      type: "trademark",
      applicantName: "Edison, Tommy",
      stages: {
        filed: {
          finished: true,
          dateFinished: "1999-01-01"
        },
        waitingForExamination: {
          finished: true,
          dateFinished: "1999-01-02"
        },
        beingExamined: {
          finished: true,
          dateFinished: "1999-02-02"
        },
        acceptanceAndOppositionPhase: {
          finished: true,
          dateFinished: "1999-05-05"
        },
        registered: {
          finished: false,
          estimatedDateOfFinish: "1999-05-06"
        },
        expired: {
          finished: false,
          estimatedDateOfFinish: "2000-05-01"
        }
      }
    },
    {
      applicationId: 123,
      title: "LightBulb - Lighting the future",
      type: "trademark",
      applicantName: "Edison, Tommy",
      stages: {
        filed: {
          finished: true,
          dateFinished: "1999-01-01"
        },
        waitingForExamination: {
          finished: true,
          dateFinished: "1999-01-02"
        },
        beingExamined: {
          finished: true,
          dateFinished: "1999-01-07"
        },
        acceptanceAndOppositionPhase: {
          finished: false,
          estimatedDateOfFinish: "1999-04-07"
        },
        registered: {
          finished: false,
          estimatedDateOfFinish: "1999-05-01"
        },
        expired: {
          finished: false,
          estimatedDateOfFinish: "2000-05-01"
        }
      }
    },
    {
      applicationId: 124,
      title: "Perpetual Motion Machine",
      type: "patent",
      applicantName: "Smith, James",
      stages: {
        filed: {
          finished: true,
          dateFinished: "1999-01-01"
        },
        waitingForExamination: {
          finished: true,
          dateFinished: "1999-01-02"
        },
        beingExamined: {
          finished: true,
          dateFinished:"1999-01-07"
        },
        acceptanceAndOppositionPhase: {
          finished: false,
          estimatedDateOfFinish: "1999-04-07"
        },
        completed: {
          finished: false,
          estimatedDateOfFinish:"1999-05-01"
        },
        expired: {
          finished: false,
          estimatedDateOfFinish:"2000-05-01"
        }
      }
    }
    ]