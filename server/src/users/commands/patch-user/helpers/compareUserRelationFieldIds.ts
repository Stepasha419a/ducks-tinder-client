interface RelationField {
  id: string;
}

export function compareUserRelationFieldIds(
  fieldIds: RelationField[],
  updatedFieldIds: RelationField[],
) {
  const toConnect = [];
  const toDisconnect = [];

  updatedFieldIds.forEach((field) => {
    if (!fieldIds.find((candidate) => candidate.id === field.id)) {
      toConnect.push(field);
    }
  });
  fieldIds.forEach((field) => {
    if (!updatedFieldIds.find((candidate) => candidate.id === field.id)) {
      toDisconnect.push(field);
    }
  });

  return { toConnect, toDisconnect };
}

// old: [1, 2, 3, 4]
// new: [1, 3, 4]
